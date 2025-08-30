import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

/** Functional props. */
interface CheckoutFormProps {
    onSuccess?: (pi: string) => void;
    onError?: (m: string) => void;
}

/** Calls on stripe element for safe payments. */
export default function CheckoutForm({ onSuccess, onError }: CheckoutFormProps) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);

    /** Handles user payment submit. */
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!stripe || !elements) return;

        setProcessing(true);
        setMessage(null);
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin + "/payment/complete",
            },
            redirect: "if_required",
        });

        if (error) {
            const msg = error.message || "Payment failed. Please try again.";
            setMessage(msg);
            onError?.(msg);
        } else if (paymentIntent) {
            if (paymentIntent.status === "succeeded" || paymentIntent.status === "requires_capture") onSuccess?.(paymentIntent.id);
            setMessage(`Status: ${paymentIntent.status}`);
        }
        setProcessing(false);
    }

    return (
        <form onSubmit={handleSubmit} className="vstack gap-3">
            <PaymentElement options={{ layout: "tabs" }} />
            {message && (
                <div className="alert alert-warning d-flex align-items-center gap-2 mb-0" role="alert">
                    <i className="bi bi-exclamation-triangle" aria-hidden="true" />
                    <div>{message}</div>
                </div>
            )}
            <div className="d-grid d-sm-flex gap-2 mt-1">
                <button className="btn btn-primary" type="submit" disabled={!stripe || processing}>
                    {processing ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Processing...
                        </>
                    ) : (
                        "Pay now"
                    )}
                </button>
                <a className="btn btn-outline-secondary" href="#support">
                    Need help?
                </a>
            </div>
        </form>
    );
}
