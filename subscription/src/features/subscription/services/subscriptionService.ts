import axios from "axios";
import api from "../../../app/services/axios";
import type { ApiResponse } from "../../../types/api.type";
import { delay } from "../../../utils/apiHelpers";
import type { User } from "firebase/auth";
import type { PaymentIntentModel } from "../types/subscription.model";

/** Creates a payment intent for a user wanting to upgrade to the pro tier plan. */
export async function createPaymentIntent(plan: string, user: User): Promise<PaymentIntentModel | null> {
    const token = await user.getIdToken();

    try {
        const resp = await api.post<ApiResponse<PaymentIntentModel>>(
            "/createPaymentIntent",
            { plan },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        await delay(500);
        return resp.data.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) throw new Error(`Error ${error.response.status}: ${error.response.data.data}`);
            else throw new Error(`Error: An unexpected error occurred.`);
        }
        return null;
    }
}

/** Cancels current subscription if user wants to downgrade to frre plan. */
export async function cancelSubscription(user: User): Promise<string | null> {
    const token = await user.getIdToken();
    try {
        const resp = await api.post<ApiResponse<string>>("/cancelSubscription", null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        await delay(500);
        return resp.data.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) throw new Error(`Error ${error.response.status}: ${error.response.data.data}`);
            else throw new Error(`Error: An unexpected error occurred.`);
        }
        return null;
    }
}
