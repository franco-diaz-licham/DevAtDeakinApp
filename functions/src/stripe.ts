import Stripe from "stripe";
import { applyCors, verifyIdTokenFromAuthHeader, mapToResponse } from "./helpers";
import { Request } from "firebase-functions/https";
import * as admin from "firebase-admin";
import e from "express";

/** Maps the monthly Stripe Price IDs to plans offered by website. */
const proPriceId = "price_1RzxVHDsvgOhyhtjfUBeWy4m";

/** Creates customer in stripe and updates user with stripe customer Id. */
async function getOrCreateCustomer(stripe: Stripe, uid: string): Promise<string> {
    const userDoc = admin.firestore().doc(`users/${uid}`);
    const snap = await userDoc.get();
    const existing = snap.exists ? snap.data()?.stripeCustomerId : undefined;
    if (existing) return existing;

    const email = snap.data()?.email || undefined;
    const customer = await stripe.customers.create({ email, metadata: { uid } });
    await userDoc.set({ stripeCustomerId: customer.id }, { merge: true });
    return customer.id;
}

/** Handles payment request from client. If successful user would be created as a customer and a subscription would be created in stripe.
 * Return most importantly the client secret in order for the client to make direct payments to stripe.
 * Data flow: Subscription creates an Invoice which creates a Client secret to allow user to pay. The subscription and invoice will be incomplete
 * until user pays the required ammount.
 * URL: https://australia-southeast1-devatdeakin-726ed.cloudfunctions.net/createPaymentIntent
 */
export async function handleCreatePaymentIntent(req: Request, res: e.Response<any, Record<string, any>>, STRIPE_SECRET_KEY: string): Promise<void> {
    // check CORS and method request.
    if (applyCors(req, res)) return;
    if (req.method !== "POST") {
        res.status(405).send(mapToResponse(405, "Method Not Allowed"));
        return;
    }

    // require auth
    const auth = await verifyIdTokenFromAuthHeader(req);
    if (!auth) {
        res.status(401).send(mapToResponse(401, "Unauthorized"));
        return;
    }
    const uid = auth.uid;

    // set payment type, default to free
    let plan: "free" | "pro" | "premium" = "free";
    try {
        plan = JSON.parse(req.rawBody?.toString() || "{}").plan;
    } catch {}

    // bypass stripe payment and save to db directly.
    if (plan === "free") {
        await admin.firestore().doc(`subscriptions/${uid}`).set(
            {
                tier: "free",
                status: "active",
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
        );

        res.json(mapToResponse(200, { plan: "free", clientSecret: null, subscriptionId: null }));
        return;
    }

    // get authenticated user and make them a stripe customer if necessary
    const stripe = new Stripe(STRIPE_SECRET_KEY);
    let customerId = "";
    try {
        customerId = await getOrCreateCustomer(stripe, uid);
    } catch (err: any) {
        const code = err?.statusCode || err?.raw?.statusCode || err?.response?.statusCode || 500;
        const msg = err?.message || err?.raw?.message || err?.response?.body || "Error with user";
        res.status(code).json(mapToResponse(code, msg));
        return;
    }

    // Subscription -> Invoice -> Client secret.
    let subscription: Stripe.Subscription | null = null;
    const data: Stripe.SubscriptionCreateParams = {
        customer: customerId,
        items: [{ price: proPriceId }],
        payment_behavior: "default_incomplete",
        metadata: { uid, plan },
        expand: ["latest_invoice.confirmation_secret"],
    };

    try {
        subscription = await stripe.subscriptions.create(data);
    } catch (err: any) {
        const code = err?.statusCode || err?.raw?.statusCode || 500;
        const msg = err?.message || err?.raw?.message || err?.response?.body || "Error creating subscription";
        res.status(code).json(mapToResponse(code, msg));
        return;
    }

    if (!subscription) {
        res.status(400).json(mapToResponse(400, "Unable to create subscription"));
        return;
    }

    // Get client secret from latest invoice
    let clientSecret: string | undefined = "";
    if (typeof subscription.latest_invoice === "string") {
        try {
            let invoice = await stripe.invoices.retrieve(subscription.latest_invoice, { expand: ["confirmation_secret"] });
            clientSecret = invoice.confirmation_secret?.client_secret;
        } catch (err: any) {
            const code = err?.statusCode || err?.raw?.statusCode || 500;
            const msg = err?.message || err?.raw?.message || err?.response?.body || "Error retriving invoice";
            res.status(code).json(mapToResponse(code, msg));
            return;
        }
    } else {
        clientSecret = (subscription.latest_invoice as Stripe.Invoice).confirmation_secret?.client_secret;
    }

    if (!clientSecret) {
        res.status(500).send(mapToResponse(500, "No client secret on initial invoice"));
        return;
    }

    // Save response to the db.
    try {
        await admin.firestore().doc(`subscriptions/${uid}`).set(
            {
                tier: plan,
                status: subscription.status,
                subscriptionId: subscription.id,
                stripeCustomerId: customerId,
                priceId: proPriceId,
                current_ended_at: subscription.ended_at,
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
        );
    } catch (err: any) {
        const code = err?.code || err?.response?.statusCode || 500;
        const msg = err?.response?.body || err?.message || "Error retriving invoice";
        res.status(code).json(mapToResponse(code, msg));
        return;
    }

    res.json(mapToResponse(200, { plan, clientSecret, subscriptionId: subscription.id }));
}

/** Handles the cancelation of a given subscription. The update on user tier plan is handled by the webhook.
 *  URL: https://australia-southeast1-devatdeakin-726ed.cloudfunctions.net/cancelSubscription
 */
export async function handleCancelSubscription(req: Request, res: e.Response<any, Record<string, any>>, STRIPE_SECRET_KEY: string): Promise<void> {
    // check CORS and method request.
    if (applyCors(req, res)) return;
    if (req.method !== "POST") {
        res.status(405).send(mapToResponse(405, "Method Not Allowed"));
        return;
    }

    // require auth
    const auth = await verifyIdTokenFromAuthHeader(req);
    if (!auth) {
        res.status(401).send(mapToResponse(401, "Unauthorized"));
        return;
    }
    const uid = auth.uid;

    // get subscription from database
    const currentSub = (await admin.firestore().doc(`subscriptions/${uid}`).get()).data();
    if (!currentSub?.subscriptionId) {
        res.status(404).json(mapToResponse(404, "No subscription in the database found."));
        return;
    }

    // Check if subscription was already cancelled
    if (currentSub?.status === "canceled") {
        res.status(200).json(mapToResponse(200, "Subscription was already cancelled."));
        return;
    }

    const stripe = new Stripe(STRIPE_SECRET_KEY);
    try {
        const sub = await stripe.subscriptions.retrieve(currentSub?.subscriptionId);
        if (!sub) {
            res.status(404).send(mapToResponse(404, "No subscription in stripe found."));
            return;
        }
        await stripe.subscriptions.cancel(sub.id);
    } catch (err: any) {
        const code = err?.code || err?.response?.statusCode || 500;
        const msg = err?.response?.body || err?.message || "Error cancelling subscription.";
        res.status(code).json(mapToResponse(code, msg));
        return;
    }

    res.status(200).json(mapToResponse(200, "Cancellation completed"));
}

/** Handles stripes webhook for when user makes a successful payment and updates dabase with payment status.
 * URL: https://australia-southeast1-devatdeakin-726ed.cloudfunctions.net/stripeWebhook
 */
export async function handleStripeWebhook(req: Request, res: e.Response<any, Record<string, any>>, STRIPE_SECRET_KEY: string, STRIPE_WEBHOOK_SECRET: string): Promise<void> {
    const stripe = new Stripe(STRIPE_SECRET_KEY);
    const sig = req.headers["stripe-signature"] as string;

    // get event type
    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(req.rawBody, sig, STRIPE_WEBHOOK_SECRET);
    } catch (err: any) {
        return;
    }

    // validate
    let tier: "free" | "pro" = "free";
    const sub = event.data.object as Stripe.Subscription;
    const uid = sub.metadata?.uid || null;
    const priceId = sub.items.data[0]?.price?.id;

    if (priceId === proPriceId) tier = "pro";
    if (!(sub.status === "active")) tier = "free";
    await admin.firestore().doc(`subscriptions/${uid}`).set(
        {
            status: sub.status,
            tier: tier,
            current_ended_at: sub.ended_at,
            cancel_at_period_end: sub.cancel_at_period_end,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
    );

    // Reflect entitlement via custom claims when active
    await admin.auth().setCustomUserClaims(uid!, { tier });
    await admin.firestore().doc(`users/${uid}`).set(
        {
            tier: tier,
        },
        { merge: true }
    );

    res.status(200).json(mapToResponse(200, "Completed."));
}
