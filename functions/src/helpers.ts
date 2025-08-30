import e from "express";
import { Request } from "firebase-functions/https";
import * as admin from "firebase-admin";

/** Allowlist your frontend origin for CORS */
const ALLOWED_ORIGINS: string[] = ["https://localhost:3000", "https://thankful-bush-0794dc200.2.azurestaticapps.net"];

/** Helper to handle CORS preflight for the client endpoint */
export function applyCors(req: Request, res: e.Response<any, Record<string, any>>) {
    const origin = req.headers.origin as string | undefined;
    const allowed = !!origin && ALLOWED_ORIGINS.includes(origin);

    if (allowed) {
        res.set("Access-Control-Allow-Origin", origin);
        res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
        res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    }

    // Handle preflight early
    if (req.method === "OPTIONS") {
        res.status(204).send("");
        return true;
    }

    return false;
}

/** verify Firebase Auth ID token if you want to require login */
export async function verifyIdTokenFromAuthHeader(req: any) {
    const h = req.headers.authorization as string | undefined;
    if (!h?.startsWith("Bearer ")) return null;
    try {
        const idToken = h.slice("Bearer ".length);
        return await admin.auth().verifyIdToken(idToken);
    } catch {
        return null;
    }
}

/** Maps respose to return generic response */
export function mapToResponse<T>(status: number, data: T): Response<T> {
    return { statusCode: status, data };
}

/** Generic api response for easier client manipulation. */
export interface Response<T> {
    statusCode: number;
    data: T | null;
}
