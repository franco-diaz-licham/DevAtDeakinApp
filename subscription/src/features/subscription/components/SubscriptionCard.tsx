import type { UserProfileModel } from "../../authentication/types/authentication.model";
import type { SubscriptionModel } from "../types/subscription.model";

/** Functional props. */
export interface SubscriptionCardProps {
    plans: SubscriptionModel[];
    currency: string;
    billingCycle: string;
    user: UserProfileModel;
    onSelect: (planId: number, plan: SubscriptionModel) => void;
}

/** 3‑plan subscription component. */
export default function SubscriptionCard(props: SubscriptionCardProps) {
    /** Gets display price for each plan. */
    const getPlanCost = (p: SubscriptionModel) =>
        p.price === 0 ? (
            p.name
        ) : (
            <>
                <span className="me-1">{props.currency}</span>
                {p.price / 100}
            </>
        );

    /** Get correct call to action based on tier subscruiption. */
    const getCTA = (p: SubscriptionModel) => {
        if (props.user?.tier === p.name.toLocaleLowerCase()) return "Get Started";
        return "Select Plan";
    };

    return (
        <section aria-label="Subscription plans">
            {/* Heading */}
            <div className="text-center mb-4">
                <h2 className="fw-bold">Choose your plan</h2>
                <p className="text-body-secondary mb-0">Simple pricing. Powerful features.</p>
            </div>

            {/* Plan options */}
            <div className="row g-4 row-cols-1 row-cols-md-3 justify-content-center">
                {props.plans.map((p) => (
                    <div className="col" key={p.id}>
                        <div className={`card h-100 border-0 rounded-4 shadow ${p.popular ? "border-primary" : ""}`}>
                            {p.popular && <div className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-primary">Most popular</div>}

                            <div className="card-body d-flex flex-column">
                                <div className="mb-3">
                                    <h5 className="card-title mb-1">{p.name}</h5>
                                    <div className="d-flex align-items-end gap-1">
                                        <span className="display-6 fw-bold">{getPlanCost(p)}</span>
                                        {p.price !== 0 && <span className="text-body-secondary">/ {props.billingCycle}</span>}
                                    </div>
                                    {p.priceNote && <div className="small text-body-secondary">{p.priceNote}</div>}
                                </div>

                                <ul className="list-unstyled flex-grow-1 small mb-3">
                                    {/* sample features */}
                                    {p.features?.map((f, i) => (
                                        <li key={i} className="d-flex align-items-start gap-2 mb-2">
                                            <i className="bi bi-check2-circle" aria-hidden="true"></i>
                                            <span>{f}</span>
                                        </li>
                                    ))}

                                    {/* sample limitations */}
                                    {p.limits && (
                                        <li className="mt-2 text-body-secondary">
                                            <em>{p.limits.join(" · ")}</em>
                                        </li>
                                    )}

                                    {/* sample extras */}
                                    {p.extra && (
                                        <>
                                            <li className="mt-2 fw-semibold">Extras</li>
                                            {p.extra.map((e, j) => (
                                                <li key={`x-${j}`} className="d-flex align-items-start gap-2 mb-2">
                                                    <i className="bi bi-plus-circle" aria-hidden="true"></i>
                                                    <span>{e}</span>
                                                </li>
                                            ))}
                                        </>
                                    )}
                                </ul>
                                <div className="d-grid mt-auto">
                                    <button type="button" className={`btn ${p.popular ? "btn-primary" : "btn-outline-primary"}`} aria-label={`Select ${p.name} plan`} disabled={props.user?.tier === p.name} onClick={() => props.onSelect(p.id, p)}>
                                        {getCTA(p)}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
