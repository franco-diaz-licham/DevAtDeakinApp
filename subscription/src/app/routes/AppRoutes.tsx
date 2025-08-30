import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import type { RouteModel } from "./Routes.Config";
import MainLayout from "../../components/layouts/MainLayout";
import AuthLayout from "../../components/layouts/AuthLayout";
import RoutesConfig from "./Routes.Config";


const AppRoutes = () => {
    const getRouting = (route: RouteModel) => {
        return (
            <Route
                path={route.path}
                key={route.path}
                element={
                    route.auth ? (
                        <PrivateRoute>
                            <MainLayout>
                                <route.component />
                            </MainLayout>
                        </PrivateRoute>
                    ) : (
                        <AuthLayout>
                            <route.component />
                        </AuthLayout>
                    )
                }
            />
        );
    };

    return <Routes>{RoutesConfig.map((route) => getRouting(route))}</Routes>;
};

export default AppRoutes;
