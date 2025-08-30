import React from "react";

/** Functional component props. */
interface AuthLayoutProps {
    children: React.ReactNode;
}

const AuthLayout = (props: AuthLayoutProps) => {
    return <main className="container vh-100 d-flex justify-content-center align-items-center">{props.children}</main>;
};

export default AuthLayout;
