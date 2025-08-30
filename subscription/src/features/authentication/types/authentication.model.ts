import type { SubscriptionModel } from "../../subscription/types/subscription.model";

/** Sets the interface for form model binding. */
export interface LoginFormDataDTO {
    email: string;
    password: string;
}

/** Sets the interface for form model binding. */
export interface SignupFormDataDTO {
    firstName: string;
    surname: string;
    email: string;
    password: string;
}

/** User response model. */
export interface UserProfileModel {
    firstName: string;
    surname: string;
    email: string;
    uid: string;
    createdAt: Date;
    tier: string;
    subscription?: SubscriptionModel;
}
