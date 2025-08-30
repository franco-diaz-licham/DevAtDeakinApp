import { BrowserRouter } from "react-router-dom";
import "./styles/App.css";
import AppRoutes from "./routes/AppRoutes";
import LoadingDisplay from "../components/layouts/LoadingDisplay";

function App() {
    return (
        <>
            <LoadingDisplay />
            <BrowserRouter>
                <AppRoutes />
            </BrowserRouter>
        </>
    );
}

export default App;
