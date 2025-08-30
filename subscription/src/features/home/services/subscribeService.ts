import axios from "axios";
import api from "../../../app/services/axios";
import type { ApiResponse } from "../../../types/api.type";
import { delay } from "../../../utils/apiHelpers";

const ep: string = "/sendEmail";

/** Sends request to firebase function that handles integration with sendgrid. */
export const createSubscription = async (email: string): Promise<string | null> => {
    try {
        const resp = await api.post<ApiResponse<string>>(`${ep}`, { email });
        await delay(500);
        return resp.data.data;
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            if (error.response) throw new Error(`Error ${error.response.status}: ${error.response.data.data}`);
            else throw new Error(`Error: An unexpected error occurred.`);
        }
        return null;
    }
};
