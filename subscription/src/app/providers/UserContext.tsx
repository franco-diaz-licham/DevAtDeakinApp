/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, type ReactNode } from "react";
import { type User } from "firebase/auth";
import { useAuth } from "../../hooks/useAuth";
import type { UserProfileModel } from "../../features/authentication/types/authentication.model";
import { getUser } from "../../features/authentication/services/userService";

/** Defines the shape of the context to be passed to children. */
interface UserContextType {
    /** Current use profile. */
    userProfile: UserProfileModel | null;
}

// Create context with default empty value
export const UserContext = createContext<UserContextType | undefined>(undefined);

/** Provider for user information context. */
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const { currentUser } = useAuth();
    const [userProfile, setUserProfile] = useState<UserProfileModel | null>(null);
    const [loading, setLoading] = useState(true);

    /** Gets current logged in user. */
    const loadUserProfile = async (user: User) => {
        const model = await getUser(user.uid);
        if (model) setUserProfile(model);
        setLoading(false);
    };

    // Get logged in user details on currentuser change.
    useEffect(() => {
        if (currentUser) {
            loadUserProfile(currentUser);
        } else {
            setUserProfile(null);
            setLoading(false);
        }
    }, [currentUser]);

    return <UserContext.Provider value={{ userProfile }}>{!loading && children}</UserContext.Provider>;
};
