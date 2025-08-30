/** Main subscritpion plan model. */
export interface SubscriptionModel {
    id: number;
    name: string;
    price: number; // 0 for free
    priceNote?: string;
    currency: string;
    popular?: boolean;
    description: string;
    features: string[];
    extra?: string[];
    limits?: string[];
}

export interface PaymentIntentModel {
    plan: string;
    clientSecret: string;
    subscriptionId: string;
}

/** Testimonial model for subscription page. */
export type TestimonialModel = {
    name: string;
    role: string;
    quote: string;
};

/** Fequently asked questions. */
export type FAQModel = {
    q: string;
    a: string;
};

/** Feature content for subscritpion type. */
export type FeatureModel = {
    feature: string;
    free: string | boolean;
    pro: string | boolean;
};

/** Type safety for selection subscription tiers. */
export type Tier = "free" | "pro";
