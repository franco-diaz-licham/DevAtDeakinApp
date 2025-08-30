import type { JSX } from "react";
import LoginPage from "../../features/authentication/pages/LoginPage";
import PostPage from "../../features/posting/pages/PostPage";
import QuestionProfilePage from "../../features/question/pages/QuestionProfilePage";
import QuestionsPage from "../../features/question/pages/QuestionsPage";
import HomePage from "../../features/home/pages/HomePage";
import NotFound from "../../pages/NotFound";
import SubscriptionPage from "../../features/subscription/pages/SubscriptionPage";
import PaymentPage from "../../features/subscription/pages/PaymentPage";
import DowngradePage from "../../features/subscription/pages/DowngradePage";

export interface RouteModel {
    path: string;
    exact: boolean;
    component: () => JSX.Element;
    auth: boolean;
}

/** Route list configuration. */
const RoutesConfig: RouteModel[] = [
    { path: "/questions", exact: true, component: QuestionsPage, auth: true },
    { path: "/subscriptions", exact: true, component: SubscriptionPage, auth: true },
    { path: "/subscriptions/downgrade", exact: true, component: DowngradePage, auth: true },
    { path: "/question/:id", exact: true, component: QuestionProfilePage, auth: true },
    { path: "/payment/:planId", exact: true, component: PaymentPage, auth: true },
    { path: "/post/", exact: true, component: PostPage, auth: true },
    { path: "/login/", exact: true, component: LoginPage, auth: false },
    { path: "/", exact: false, component: HomePage, auth: true },
    { path: "*", exact: false, component: NotFound, auth: false },
];

export default RoutesConfig;
