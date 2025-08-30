import SubscriptionCard from "../components/SubscriptionCard";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { getUser } from "../../authentication/services/userService";
import type { UserProfileModel } from "../../authentication/types/authentication.model";
import { defaultPlans, faqs, featureList, testimonials } from "../services/defaultData";
import type { SubscriptionModel, Tier } from "../types/subscription.model";
import { useLoading } from "../../../hooks/useLoading";

/** Used for dyanmic access of Feature properties. */
const TIERS: readonly Tier[] = ["free", "pro"];

/** Users can see and select the plan they want to change to. */
export default function SubscriptionPage() {
    const { setLoading } = useLoading();
    const navigate = useNavigate();

    /** Handles user selected plan. */
    const handleSelect = (planId: number, sub: SubscriptionModel) => {
        if (user?.tier === sub.name.toLocaleLowerCase()) navigate(`/`);
        else if (sub.name.toLocaleLowerCase() == "free") navigate("/subscriptions/downgrade");
        else navigate(`/payment/${planId}`);
    };
    const [user, setUser] = useState<UserProfileModel>();
    const { currentUser } = useAuth();

    /** Get required data on mount. */
    const getData = async () => {
        await setLoading(true);
        const curr = await getUser(currentUser!.uid);
        if (!curr) return;
        setUser(curr);
        await setLoading(false);
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            {/* Pricing */}
            <SubscriptionCard plans={defaultPlans} currency="A$" billingCycle="mo" onSelect={handleSelect} user={user!} />

            {/* Feature comparison */}
            <section className="my-5" aria-label="Feature comparison">
                <h3 className="fw-bold text-center mb-4">Compare features</h3>
                <div className="shadow">
                    <table className="table table-hover align-middle">
                        <thead>
                            <tr className="table-light">
                                <th scope="col">Feature</th>
                                <th scope="col">Free</th>
                                <th scope="col">Pro</th>
                            </tr>
                        </thead>
                        <tbody>
                            {featureList.map((row) => (
                                <tr key={row.feature}>
                                    <th scope="row">{row.feature}</th>
                                    {TIERS.map((tier: Tier) => {
                                        const val = row[tier];
                                        const isBool = typeof val === "boolean";
                                        return <td key={tier}>{isBool ? val ? <i className="bi bi-check2 text-success" aria-label="Included" /> : <i className="bi bi-x text-danger" aria-label="Not included" /> : <span>{val}</span>}</td>;
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Testimonials */}
            <section className="my-5" aria-label="Customer reviews">
                <div className="text-center mb-3">
                    <h3 className="fw-bold mb-1">Loved by builders</h3>
                    <div className="text-body-secondary">
                        <span className="me-2">
                            <i className="bi bi-star-fill" aria-hidden="true"></i>
                            <i className="bi bi-star-fill" aria-hidden="true"></i>
                            <i className="bi bi-star-fill" aria-hidden="true"></i>
                            <i className="bi bi-star-fill" aria-hidden="true"></i>
                            <i className="bi bi-star-half" aria-hidden="true"></i>
                        </span>
                        4.7/5 average from 1,200+ ratings
                    </div>
                </div>

                <div className="row g-4 row-cols-1 row-cols-md-3">
                    {testimonials.map((t, i) => (
                        <div className="col" key={i}>
                            <figure className="h-100 card shadow border-0">
                                <blockquote className="card-body mb-0">
                                    <p className="mb-3">“{t.quote}”</p>
                                    <figcaption className="d-flex align-items-center gap-2">
                                        <div className="rounded-circle bg-secondary-subtle" style={{ width: 36, height: 36 }} />
                                        <div>
                                            <div className="fw-semibold">{t.name}</div>
                                            <small className="text-body-secondary">{t.role}</small>
                                        </div>
                                    </figcaption>
                                </blockquote>
                            </figure>
                        </div>
                    ))}
                </div>
            </section>

            {/* Security & Guarantee */}
            <section className="my-5" aria-label="Security and guarantee">
                <div className="row g-4">
                    <div className="col-md">
                        <div className="card h-100 border-0 shadow">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <i className="bi bi-shield-lock me-2" aria-hidden="true"></i>
                                    Enterprise-grade security
                                </h5>
                                <p className="card-text">Data encrypted in transit and at rest. Optional SSO (SAML) and fine-grained access controls on Premium.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md">
                        <div className="card h-100 border-0 shadow">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <i className="bi bi-arrow-counterclockwise me-2" aria-hidden="true"></i>
                                    14-day money-back guarantee
                                </h5>
                                <p className="card-text">Try Pro or Premium risk-free. Cancel within 14 days for a full refund—no questions asked.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="my-5" aria-label="Frequently asked questions">
                <h3 className="fw-bold text-center mb-4">FAQs</h3>
                <div className="accordion shadow" id="pricingFaq">
                    {faqs.map((item, idx) => {
                        const collapseId = `faq-collapse-${idx}`;
                        const headingId = `faq-heading-${idx}`;
                        return (
                            <div className="accordion-item" key={idx}>
                                <h2 className="accordion-header" id={headingId}>
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#${collapseId}`} aria-expanded="false" aria-controls={collapseId}>
                                        {item.q}
                                    </button>
                                </h2>
                                <div id={collapseId} className="accordion-collapse collapse" aria-labelledby={headingId} data-bs-parent="#pricingFaq">
                                    <div className="accordion-body">{item.a}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </>
    );
}
