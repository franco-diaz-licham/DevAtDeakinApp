/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User, type UserCredential } from "firebase/auth";
import type { SignupFormDataDTO, UserProfileModel } from "../../features/authentication/types/authentication.model";
import { getUser, loginUser, logoutUser, singUpUser } from "../../features/authentication/services/userService";
import { auth } from "../services/firebase";

/** Defines the shape of the context to be passed to children */
interface AuthContextType {
    /** Current authenticated user. Based on Firebase authenticated user. */
    currentUser: User | null;
    /** Current user profile information. */
    currentUserProfile: UserProfileModel | null;
    /** Calls fiberbase createUserWithEmailAndPassword(). */
    signUp: (model: SignupFormDataDTO) => Promise<UserCredential>;
    /** Calls firebase signInWithEmailAndPassword(). */
    login: (email: string, password: string) => Promise<UserCredential>;
    /** Calls firebase signOut(). */
    logout: () => Promise<void>;
}

// Create context with default empty value
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Provider for authentication context. Utilises userService to connect to the database. */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [currentUserProfile, setCurrentUserProfile] = useState<UserProfileModel | null>(null);
    const [loading, setLoading] = useState(true);

    /** Calls signup from userService. */
    const signUp = async (model: SignupFormDataDTO) => singUpUser(model);

    /** Calls login from the userService.  */
    const login = (email: string, password: string) => loginUser(email, password);

    /** Calls logout from the userService. */
    const logout = () => logoutUser();

    // Subscribe to firebase auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            getUserProfile(user);
            setLoading(false);
        });

        // Cleanup
        return unsubscribe;
    }, []);

    const getUserProfile = async (user: User | null) => {
        if (!user) return;
        const userProfile = await getUser(user.uid!);
        setCurrentUserProfile(userProfile);
    };

    /** Type used to expose functional component internals. */
    const value: AuthContextType = {
        currentUser,
        currentUserProfile,
        signUp,
        login,
        logout,
    };

    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
