import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";
import { LoginFormType } from "../types/loginFormType";

/** Routable component used for allowing users to login or signup to the website. */
export default function LoginPage() {
    const [form, setForm] = useState(LoginFormType.Login);

    /** Gets between the login or signup form types. */
    const getForm = () => (form === LoginFormType.Login ? <LoginForm onSingupChange={handleSingupChanged} /> : <SignupForm onCancelChange={handleCancelChanged} />);

    /** Sets the form type to be signup. */
    const handleSingupChanged = () => setForm(LoginFormType.Signup);

    /** Sets the form type to be login. */
    const handleCancelChanged = () => setForm(LoginFormType.Login);

    return (
        <div className={`card shadow rounded-4 border-0 p-4`} style={{ width: "400px" }}>
            <div className="card-body">{getForm()}</div>
        </div>
    );
}
