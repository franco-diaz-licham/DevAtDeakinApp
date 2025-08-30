// routes/PrivateRoute.tsx
import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const { currentUser } = useAuth();
    return currentUser ? props.children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
