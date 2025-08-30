import type { FAQModel, FeatureModel, SubscriptionModel, TestimonialModel } from "../types/subscription.model";

/** Sample testimonials */
export const testimonials: TestimonialModel[] = [
    {
        name: "Amelia R.",
        role: "IT Manager, Private School",
        quote: "Switching to Premium cut our deployment time in half and the support is lightning fast.",
    },
    {
        name: "Daniel K.",
        role: "Full-stack Developer",
        quote: "Pro gives me everything I need—custom domains and analytics—without breaking the bank.",
    },
    {
        name: "Priya S.",
        role: "Founder",
        quote: "We started on Free, validated our product, then upgraded—smooth and simple.",
    },
];

/** Sample FAQs. */
export const faqs: FAQModel[] = [
    {
        q: "Can I change plans later?",
        a: "Yes. You can upgrade or downgrade at any time. Changes take effect immediately and are prorated where applicable.",
    },
    {
        q: "Do you offer discounts for education or non-profits?",
        a: "Yes. Eligible schools and non-profits receive a discount. Contact sales and we’ll verify your status.",
    },
    {
        q: "Is there a free trial for paid plans?",
        a: "We offer a 14-day trial on Pro and Premium. No credit card required to start.",
    },
    {
        q: "How do I cancel?",
        a: "You can cancel in the billing portal at any time. Your plan remains active until the end of the current billing period.",
    },
];

/** Sample features. */
export const featureList: FeatureModel[] = [
    { feature: "Projects", free: "1", pro: "Unlimited" },
    { feature: "Custom domains", free: false, pro: true },
    { feature: "Analytics", free: "Basic", pro: "Advanced" },
    { feature: "Team roles & permissions", free: false, pro: true },
    { feature: "SLA & phone support", free: false, pro: false },
    { feature: "SAML/SSO", free: false, pro: false },
    { feature: "Audit logs", free: false, pro: false },
];

export const defaultPlans: SubscriptionModel[] = [
    {
        id: 1,
        name: "Free",
        price: 0,
        priceNote: "Forever",
        currency: "aud",
        description: "Forever free",
        popular: false,
        features: ["1 project", "Community support", "Basic analytics", "Email digests"],
        limits: ["Up to 100 MB storage", "Limited API quota"],
    },
    {
        id: 2,
        name: "Pro",
        price: 500,
        priceNote: "Billed monthly",
        currency: "aud",
        description: "Unlimited projects, advanced analytics",
        popular: true,
        features: ["Unlimited projects", "Priority email support", "Advanced analytics", "Custom domains"],
        extra: ["Team roles & permissions", "Webhooks"],
    },
];
