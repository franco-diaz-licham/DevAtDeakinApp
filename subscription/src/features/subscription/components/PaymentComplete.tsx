import { useMemo, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import type { PaymentIntentModel, SubscriptionModel } from "../types/subscription.model";

/** Functional props. */
export interface PaymentCompleteProps {
    plan: SubscriptionModel;
    paymentIntent: PaymentIntentModel | null;
}

/** Payment notification when user has successfully made a payment. */
export default function PaymentComplete(props: PaymentCompleteProps): JSX.Element {
    const navigate = useNavigate();
    const displayPlan = props.plan.name || "Your plan";
    const displayCurrency = "AUD";

    /** Chace formatted amount.  */
    const amount = useMemo(() => {
        const cents = props.plan.price;
        if (typeof cents === "number") {
            try {
                return (cents / 100).toLocaleString(undefined, {
                    style: "currency",
                    currency: displayCurrency,
                });
            } catch {
                return `${(cents / 100).toFixed(2)} ${displayCurrency}`;
            }
        }
        return undefined;
    }, [props.plan.price]);

    return (
        <main className="container my-5" aria-labelledby="payment-success-title">
            <div className="row justify-content-center">
                <div className="col-12 col-lg-8">
                    <div className="card border-0 shadow overflow-hidden">
                        <div className="bg-success-subtle p-4 text-center position-relative">
                            <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-success text-white" style={{ width: 64, height: 64 }}>
                                <i className="bi bi-check-lg fs-2" aria-hidden="true"></i>
                            </div>
                            <h1 id="payment-success-title" className="h3 fw-bold mt-3 mb-1">
                                Payment successful
                            </h1>
                            <p className="mb-0 text-success-emphasis">Thank you! Your subscription is now active.</p>
                        </div>

                        <div className="card-body p-4 p-md-5">
                            {/* Summary */}
                            <div className="row g-4 mb-4">
                                <div className="col-12 col-md">
                                    <div className="border rounded-3 p-3 h-100">
                                        <div className="text-body-secondary small mb-1">Plan</div>
                                        <div className="fw-semibold">{displayPlan}</div>
                                    </div>
                                </div>
                                <div className="col-6 col-md">
                                    <div className="border rounded-3 p-3 h-100">
                                        <div className="text-body-secondary small mb-1">Amount</div>
                                        <div className="fw-semibold">{amount}</div>
                                    </div>
                                </div>
                                <div className="col-6 col-md">
                                    <div className="border rounded-3 p-3 h-100">
                                        <div className="text-body-secondary small mb-1">Payment ID</div>
                                        <div className="fw-semibold text-truncate" title={props.paymentIntent?.subscriptionId}>
                                            {props.paymentIntent?.subscriptionId}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Receipt + Next steps */}
                            <div className="row g-4 align-items-stretch mb-4">
                                <div className="col-12 col-lg">
                                    <div className="h-100 border rounded-3 p-3 p-md-4">
                                        <h2 className="h6 fw-bold mb-2">Receipt</h2>
                                        <p className="mb-3">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, ad.</p>
                                    </div>
                                </div>
                                <div className="col-12 col-lg">
                                    <div className="h-100 border rounded-3 p-3 p-md-4">
                                        <h2 className="h6 fw-bold mb-2">Next steps</h2>
                                        <ul className="list-unstyled mb-3 small">
                                            <li className="d-flex align-items-start gap-2 mb-2">
                                                <i className="bi bi-check2-circle" aria-hidden="true"></i>
                                                <span>Lorem ipsum dolor sit amet.</span>
                                            </li>
                                            <li className="d-flex align-items-start gap-2 mb-2">
                                                <i className="bi bi-check2-circle" aria-hidden="true"></i>
                                                <span>Lorem ipsum dolor sit..</span>
                                            </li>
                                            <li className="d-flex align-items-start gap-2 mb-2">
                                                <i className="bi bi-check2-circle" aria-hidden="true"></i>
                                                <span>Lorem ipsum dolor sit amet consectetur..</span>
                                            </li>
                                        </ul>
                                        <div className="d-flex flex-wrap gap-2">
                                            <button className="btn btn-primary" onClick={() => navigate("/")}>
                                                Go Home
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Help */}
                            <div className="alert alert-success-subtle border-success-subtle d-flex align-items-center gap-2" role="alert">
                                <i className="bi bi-shield-check" aria-hidden="true"></i>
                                <div>
                                    Your payment was processed securely by Stripe. Need help? <a href={`mailto:support@devatdeakin.com.au`}>Contact support</a>.
                                </div>
                            </div>
                        </div>
                    </div>
                    <p className="text-center text-body-secondary small mt-3">🎉Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, sint!</p>
                </div>
            </div>
        </main>
    );
}
