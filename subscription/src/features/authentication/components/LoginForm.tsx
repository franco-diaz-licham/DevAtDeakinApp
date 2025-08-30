/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";
import logo from "../../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import TextInput from "../../../components/ui/TextInput";
import type { LoginFormDataDTO } from "../types/authentication.model";

/** Functional props. */
interface LoginFormProps {
    /** Functional call for LoginPage to orchestrate form changes. */
    onSingupChange: () => void;
}

/** Form for allowing users login. */
export default function LoginForm(props: LoginFormProps) {
    const { login } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormDataDTO>();
    const navigate = useNavigate();

    const [firebaseError, setFirebaseError] = useState<string | null>(null);

    /** Handle on submit form event. Calls firebase login(). */
    const onSubmit = async (data: LoginFormDataDTO) => {
        try {
            setFirebaseError(null);
            await login(data.email, data.password);
            navigate("/");
        } catch (err: any) {
            setFirebaseError(err.message);
        }
    };

    /** Gets the login button content. */
    const getLoginContent = () => {
        if (!isSubmitting) return "Login";
        return (
            <>
                <span role="status">Logging in...</span>
                <span className="spinner-border spinner-border-sm ms-3" aria-hidden="true"></span>
            </>
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <img src={logo} alt="" className="w-100 mb-4" />
            <h2 className="mb-4 text-center">Login</h2>
            <TextInput id="email" label="Email" type="email" showLabel={true} placeholder="empty" className="mb-3" required register={register} errors={errors} />
            <TextInput id="password" label="Password" type="password" showLabel={true} placeholder="empty" className="mb-3" required register={register} errors={errors} />
            {firebaseError && (
                <div className="alert alert-danger" role="alert">
                    {firebaseError}
                </div>
            )}
            <div className="text-center">
                <button type="submit" className="btn btn-primary w-100">
                    {getLoginContent()}
                </button>
                <a className="mt-3 d-block fw-bold" style={{ cursor: "pointer" }} onClick={() => props.onSingupChange()}>
                    Signup
                </a>
            </div>
        </form>
    );
}
