import { useContext } from "react";
import { UserContext } from "../app/providers/UserContext";

/** Export this custom hook to use the context safely. */
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within a UserProvider");
    return context;
};
