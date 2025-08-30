import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, type UserCredential} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import type { SignupFormDataDTO, UserProfileModel } from "../types/authentication.model";
import { auth, db } from "../../../app/services/firebase";
import { delay } from "../../../utils/apiHelpers";

/** Gets users from firestore. */
export async function getUser(uid: string): Promise<UserProfileModel | null> {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) return docSnap.data() as UserProfileModel;
    return null;
}

/** Logs user into the user. */
export async function loginUser(email: string, password: string): Promise<UserCredential> {
    await delay(500);
    return signInWithEmailAndPassword(auth, email, password);
}

/** Logs user out from the website. */
export function logoutUser() {
    return signOut(auth);
}

/** Signs up user to the website. */
export async function singUpUser(model: SignupFormDataDTO): Promise<UserCredential> {
    const userCred = await createUserWithEmailAndPassword(auth, model.email, model.password);
    await delay(500);
    const id = userCred.user.uid;

    // Store custom user profile in Firestore
    const docRef = doc(db, "users", id);
    await setDoc(docRef, {
        uid: id,
        email: model.email,
        firstName: model.firstName,
        surname: model.surname,
        createdAt: new Date(),
        tier: "free"
    });

    return userCred;
}
