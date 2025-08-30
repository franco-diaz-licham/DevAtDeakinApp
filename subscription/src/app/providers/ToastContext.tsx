/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useRef, useState } from "react";
import { Toast as BootstrapToast } from "bootstrap";
import { flushSync } from "react-dom";

/** Toast configuration options. */
interface ToastOptions {
    result?: "success" | "danger" | "warning" | "info";
}

export const ToastContext = createContext<{ show: (msg: string, options?: ToastOptions) => void }>({
    show: () => {},
});

/** Toast provider. */
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const toastRef = useRef<HTMLDivElement>(null);
    const instanceRef = useRef<BootstrapToast | null>(null);
    const [message, setMessage] = useState("");
    const [resultType, setResultType] = useState("");

    useEffect(() => {
        if (!toastRef.current) return;
        instanceRef.current = new BootstrapToast(toastRef.current, {
            autohide: true,
            delay: 4000,
        });
    }, []);

    const show = (msg: string, options?: ToastOptions) => {
        // Force React to commit DOM updates.
        flushSync(() => {
            setMessage(msg);
            setResultType(options?.result ?? "success");
        });

        instanceRef.current?.show();
    };

    return (
        <ToastContext.Provider value={{ show }}>
            {children}
            <div ref={toastRef} className={`toast position-fixed bottom-0 end-0 m-4 text-bg-${resultType}`} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="d-flex">
                    <div className="toast-body">{message}</div>
                    <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        </ToastContext.Provider>
    );
};
