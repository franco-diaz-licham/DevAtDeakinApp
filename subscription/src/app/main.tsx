import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import "../../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "highlight.js/styles/github.css";
import { AuthProvider } from "./providers/AuthContext";
import { UserProvider } from "./providers/UserContext";
import { ToastProvider } from "./providers/ToastContext";
import { LoadingProvider } from "./providers/LoadingContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <AuthProvider>
            <UserProvider>
                <ToastProvider>
                    <LoadingProvider>
                        <App />
                    </LoadingProvider>
                </ToastProvider>
            </UserProvider>
        </AuthProvider>
    </React.StrictMode>
);
