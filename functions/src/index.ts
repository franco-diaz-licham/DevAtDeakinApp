import { onRequest } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import { defineSecret } from "firebase-functions/params";
import * as admin from "firebase-admin";
import { handleCancelSubscription, handleCreatePaymentIntent, handleStripeWebhook } from "./stripe";
import { handleSendEmail } from "./sendgrid";

// Configure region/limits
setGlobalOptions({
    region: "australia-southeast1",
    timeoutSeconds: 60,
    memory: "256MiB",
});

// Init Firestore once
try {
    admin.initializeApp();
} catch {}

// Get secrets
const STRIPE_SECRET_KEY = defineSecret("STRIPE_SECRET_KEY");
const STRIPE_WEBHOOK_SECRET = defineSecret("STRIPE_WEBHOOK_SECRET");
const SENDGRID_API_KEY = defineSecret("SENDGRID_API_KEY");
const SENDGRID_FROM_EMAIL = defineSecret("SENDGRID_FROM_EMAIL");

// Handle in-coming reuqests
export const createPaymentIntent = onRequest({ secrets: [STRIPE_SECRET_KEY] }, async (req, res): Promise<any> => handleCreatePaymentIntent(req, res, STRIPE_SECRET_KEY.value()));
export const cancelSubscription = onRequest({ secrets: [STRIPE_SECRET_KEY] }, async (req, res): Promise<any> => handleCancelSubscription(req, res, STRIPE_SECRET_KEY.value()));
export const stripeWebhook = onRequest({ secrets: [STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET] }, async (req, res): Promise<any> => handleStripeWebhook(req, res, STRIPE_SECRET_KEY.value(), STRIPE_WEBHOOK_SECRET.value()));
export const sendEmail = onRequest({ secrets: [SENDGRID_API_KEY, SENDGRID_FROM_EMAIL] }, async (req, res): Promise<void> => handleSendEmail(req, res, SENDGRID_API_KEY.value(), SENDGRID_FROM_EMAIL.value()));
