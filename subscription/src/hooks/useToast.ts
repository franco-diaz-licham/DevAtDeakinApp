import { useContext } from "react";
import { ToastContext } from "../app/providers/ToastContext";

/** Toast hook. */
export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error("useAuth must be used within an ToastProvider");
    return context;
};
