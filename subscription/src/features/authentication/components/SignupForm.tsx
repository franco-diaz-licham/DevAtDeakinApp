/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import TextInput from "../../../components/ui/TextInput";
import { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import type { SignupFormDataDTO } from "../types/authentication.model";


/** Functional props. */
interface SignupFormProps {
    /** Functional call for LoginPage to orchestrate form changes. */
    onCancelChange: () => void;
}

/** Form used for signup to the website. */
export default function SignupForm(props: SignupFormProps) {
    const { signUp } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignupFormDataDTO>();
    const navigate = useNavigate();
    const [firebaseError, setFirebaseError] = useState<string | null>(null);

    /** Handles the form submit. */
    const onSubmit = async (data: SignupFormDataDTO) => {
        try {
            setFirebaseError(null);
            await signUp(data);
            navigate("/");
        } catch (err: any) {
            setFirebaseError(err.message);
        }
    };

    /** Gets the login button content. */
    const getSignUpContent = () => {
        if (!isSubmitting) return "Sign Up";
        return (
            <>
                <span role="status">Creating Account...</span>
                <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
            </>
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <img src={logo} alt="" className="w-100 mb-4" />
            <h2 className="mb-4 text-center">Create Account</h2>
            <TextInput id="firstName" label="First Name" placeholder="empty" showLabel={true} className="mb-3" required register={register} errors={errors} />
            <TextInput id="surname" label="Surname" placeholder="empty" className="mb-3" showLabel={true} required register={register} errors={errors} />
            <TextInput id="email" label="Email" type="email" placeholder="empty" className="mb-3" showLabel={true} required register={register} errors={errors} />
            <TextInput id="password" label="Password" type="password" placeholder="empty" showLabel={true} className="mb-3" required register={register} errors={errors} />
            {firebaseError && (
                <div className="alert alert-danger" role="alert">
                    {firebaseError}
                </div>
            )}
            <div className="text-center">
                <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
                    {getSignUpContent()}
                </button>
                <a className="mt-3 d-block text-danger fw-bold" style={{ cursor: "pointer" }} onClick={() => props.onCancelChange()}>
                    Cancel
                </a>
            </div>
        </form>
    );
}
