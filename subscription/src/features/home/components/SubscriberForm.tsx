import { useRef } from "react";
import { useToast } from "../../../hooks/useToast";
import { createSubscription } from "../services/subscribeService";

/** SubscriberForm component */
export default function SubscriberForm() {
    const { show } = useToast();
    const inputRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const email = inputRef.current?.value?.trim() || "";
        if (!email) return;
        try {
            const resp = await createSubscription(email);
            show(resp ?? "Welcome to our news letter!", { result: "success" });
            formRef.current?.reset();
        } catch (error: unknown) {
            if (error instanceof Error) show(error.message, { result: "danger" });
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark-subtle px-3 py-2">
            <div className="container-xxl d-flex justify-content-between">
                <div className="navbar-brand fw-bold text-uppercase">Sign Up For Our Daily Insider</div>
                <form ref={formRef} className="input-group shadow-lg" onSubmit={(e) => handleSubscribe(e)}>
                    <input ref={inputRef} id="subscribe" type="email" className="form-control" placeholder="Email..." required />
                    <button className="btn btn-primary fw-bold text-white" type="submit" id="button-addon2">
                        SUBSCRIBE
                    </button>
                </form>
            </div>
        </nav>
    );
}
