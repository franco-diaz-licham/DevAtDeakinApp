import sgMail from "@sendgrid/mail";
import { applyCors, mapToResponse } from "./helpers";
import { Request } from "firebase-functions/https";
import e from "express";
import client from "@sendgrid/client";

/** Website list id in sendgrid. */
const LIST_ID = "6e53776c-7695-4b7b-8a6c-e7e10b4cb666";

/** Add or update user into sendgrid list. */
async function createUser(email: string): Promise<boolean> {
    const request = {
        method: "PUT",
        url: "/v3/marketing/contacts",
        body: {
            list_ids: [LIST_ID],
            contacts: [
                {
                    email,
                },
            ],
        },
    } as const;

    const [resp] = await client.request(request);
    return resp.statusCode === 202;
}

/** Searches contact and checks if added to the website email list.*/
async function searchContact(email: string): Promise<boolean> {
    const emailLower = email.toLowerCase();
    const data = {
        emails: [emailLower],
    };

    const request = {
        url: `/v3/marketing/contacts/search/emails`,
        method: "POST",
        body: data,
    } as const;

    const [resp, body] = await client.request(request);
    if (resp.statusCode !== 200) return false;

    const contact = body?.result?.[emailLower]?.contact;
    const listIds: string[] = contact?.list_ids ?? [];
    return listIds.includes(LIST_ID);
}

/** Sengrid subscription API. Handles new users and exsiting users.
 * URL: https://australia-southeast1-devatdeakin-726ed.cloudfunctions.net/sendEmail
 */
export const handleSendEmail = async (req: Request, res: e.Response<any, Record<string, any>>, SENDGRID_API_KEY: string, SENDGRID_FROM_EMAIL: string): Promise<void> => {
    // Validate request.
    if (applyCors(req, res)) return;
    if (req.method !== "POST") {
        res.status(405).send(mapToResponse(405, "Method Not Allowed"));
        return;
    }

    // Parse JSON body
    let body: { email?: string };
    try {
        body = JSON.parse(req.rawBody?.toString() || "{}");
    } catch {
        res.status(400).send(mapToResponse(400, "Invalid JSON."));
        return;
    }

    // Configure SendGrid
    client.setApiKey(SENDGRID_API_KEY);
    sgMail.setApiKey(SENDGRID_API_KEY);
    const toEmail = (body.email || "").trim();
    if (!toEmail) {
        res.status(400).send(mapToResponse(400, "Missing 'email'."));
        return;
    }

    // check if user already exists
    try {
        const userExists = await searchContact(toEmail);
        if (userExists) {
            res.status(200).send(mapToResponse(200, "You are already signed up."));
            return;
        }
    } catch (err: any) {
        const code = err?.code || err?.response?.statusCode || 500;
        const msg = err?.response?.body || err?.message || "Error searching user";
        if (code !== 404) {
            res.status(code).json(mapToResponse(code, msg));
            return;
        }
    }

    // create user.
    try {
        const updateResult = await createUser(toEmail);
        if (!updateResult) {
            res.status(400).send(mapToResponse(400, "Problem with user."));
            return;
        }
    } catch (err: any) {
        const code = err?.code || err?.response?.statusCode || 500;
        const msg = err?.response?.body || err?.message || "Error creating user";
        res.status(code).json(mapToResponse(code, msg));
        return;
    }

    // Send Welcome email.
    const msg = {
        to: toEmail,
        from: { email: SENDGRID_FROM_EMAIL, name: "Dev@Deakin" },
        subject: "Welcome to Dev@Deakin!",
        text: "Thanks for signing up!",
    };

    try {
        await sgMail.send(msg);
        res.status(200).json(mapToResponse(200, "Welcome to our newsletter!"));
    } catch (err: any) {
        const code = err?.code || err?.response?.statusCode || 500;
        const msg = err?.response?.body || err?.message || "Email send failed";
        res.status(code).json(mapToResponse(code, msg));
    }
};
