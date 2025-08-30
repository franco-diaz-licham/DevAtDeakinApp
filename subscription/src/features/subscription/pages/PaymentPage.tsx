/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useNavigate, useParams } from "react-router-dom";
import CheckoutForm from "../components/CheckOutForm";
import { createPaymentIntent } from "../services/subscriptionService";
import { useAuth } from "../../../hooks/useAuth";
import SubscriptionSummary from "../components/SubscriptionSummary";
import PaymentComplete from "../components/PaymentComplete";
import { defaultPlans } from "../services/defaultData";
import type { PaymentIntentModel } from "../types/subscription.model";
import { getUser } from "../../authentication/services/userService";
import { useToast } from "../../../hooks/useToast";

/** Stripe payment page for users to interact with strip elements. */
export default function PaymentPage() {
    const stripePromise = loadStripe(import.meta.env?.VITE_STRIPE_PUBLISHABLE_KEY);
    const { planId = 1 } = useParams();
    const navigate = useNavigate();
    const { show } = useToast();
    const plan = defaultPlans[Number(planId)] ?? defaultPlans[1];
    const [paymentComplete, setPaymentComplete] = useState(false);
    const { currentUser } = useAuth();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [initError, setInitError] = useState<string | null>(null);
    const appearance = useMemo(() => ({ theme: "stripe" as const }), []);
    const paymentIntent = useRef<PaymentIntentModel>(null);

    /** Guard agains double requests */
    const didRun = useRef(false);

    /** Check if user is already in the pro plan */
    const handlePayment = async () => {
        try {
            if (didRun.current) return;
            didRun.current = true;
            if (!currentUser) return;

            // if user is already in the pro tie, show message and redirect.
            const user = await getUser(currentUser.uid);
            if (user?.tier === "pro") {
                show("Pro licence is active. Redirecting to HOME", { result: "success" });
                navigate("/");
                return;
            }

            // otherwise create a new payment intent.
            paymentIntent.current = await createPaymentIntent("pro", currentUser!);
            if (!paymentIntent.current) return;
            setClientSecret(paymentIntent.current.clientSecret);
        } catch (err: any) {
            const msg = err?.message || "Failed to initialize payment.";
            setInitError(msg);
        }
    };

    useEffect(() => {
        handlePayment();
    }, [currentUser]);

    return (
        <div className="row justify-content-center">
            {!paymentComplete ? (
                <div className="col-12 col-md-8 col-lg-6">
                    <SubscriptionSummary plan={plan} />
                    <div className="card border-0 shadow">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Enter payment details</h5>
                            {initError && <div className="alert alert-danger">{initError}</div>}
                            {!clientSecret ? (
                                <div className="d-flex align-items-center gap-2">
                                    <span className="spinner-border" role="status" aria-hidden="true"></span>
                                    <span>Preparing secure checkout…</span>
                                </div>
                            ) : (
                                <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                                    <CheckoutForm onSuccess={() => setPaymentComplete(true)} />
                                </Elements>
                            )}
                        </div>
                    </div>
                    <p className="text-body-secondary small mt-3">Payments are processed securely by Stripe. Security comes first!</p>
                </div>
            ) : (
                <PaymentComplete plan={plan} paymentIntent={paymentIntent.current} />
            )}
        </div>
    );
}
