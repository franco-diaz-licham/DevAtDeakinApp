import type { SubscriptionModel } from "../types/subscription.model";

/** Functional props. */
export interface SubscriptionSummaryProps {
    plan: SubscriptionModel;
    onChangePlan?: () => void;
}

/** Shows short summary of current chosen plan. */
export default function SubscriptionSummary({ plan, onChangePlan }: SubscriptionSummaryProps) {
    const major = (plan.price / 100).toLocaleString(undefined, {
        style: "currency",
        currency: "AUD",
    });

    return (
        <section className="my-4" aria-label="Selected plan">
            <div className="card border-0 shadow">
                <div className="card-body d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-3">
                    <div>
                        <h5 className="card-title mb-1">{plan.name}</h5>
                        <div className="d-flex align-items-baseline gap-2">
                            <span className="h3 mb-0 fw-bold">{major}</span>
                            <span className="text-body-secondary">{plan.currency.toUpperCase()} / mo</span>
                        </div>
                        {plan.description && <p className="text-body-secondary small mb-0 mt-2">{plan.description}</p>}
                    </div>

                    {onChangePlan && (
                        <div className="ms-md-auto">
                            <button className="btn btn-outline-secondary" onClick={onChangePlan}>
                                Change plan
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
