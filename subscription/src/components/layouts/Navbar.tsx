import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getUser } from "../../features/authentication/services/userService";
import { useBootstrapTheme } from "../../hooks/userBootstrapTheme";

/** Navbar functional component. */
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { currentUser, logout } = useAuth();
    const [tier, setTier] = useState("free");
    const { theme, toggle } = useBootstrapTheme();

    /** Handles logging out. */
    const handleLogout = async () => {
        await logout();
    };

    /** Gets log button inner content. */
    const getLogButton = () => {
        if (!currentUser) {
            return (
                <NavLink to={"/login"} className="nav-link" aria-current="page">
                    Login
                </NavLink>
            );
        } else {
            return (
                <Link to={""} className="nav-link" aria-current="page" onClick={handleLogout}>
                    Logout
                </Link>
            );
        }
    };

    /** Get all data */
    const getData = async () => {
        if (!currentUser) return;
        const user = await getUser(currentUser.uid);
        setTier(user?.tier ?? "free");
    };

    useEffect(() => {
        getData();
    }, [currentUser]);

    /** Get features visible to pro users only. */
    const getProFeatures = () => {
        if (tier !== "free") {
            return (
                <button type="button" className="nav-link btn btn-link" onClick={toggle}>
                    {theme === "dark" ? <i className="bi bi-sun-fill"></i> : <i className="bi bi-moon-stars-fill"></i>}
                </button>
            );
        }
        return <></>;
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark-subtle justify-content-between">
            <div className="container-xxl px-5 py-1">
                <Link to="/">
                    <img src={logo} alt="Bootstrap" width="200" />
                </Link>

                {/* Hamburger (manual state) */}
                <button className="navbar-toggler mb-2" type="button" aria-controls="navbarNav" aria-expanded={isOpen} aria-label="Toggle navigation" onClick={() => setIsOpen(!isOpen)}>
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Collapsible area — correct Bootstrap classes */}
                <div id="navbarNav" className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
                    <ul className="navbar-nav fw-bold text-uppercase ms-auto">
                        <li className="nav-item">
                            <NavLink to={"/subscriptions"} className="nav-link" aria-current="page">
                                Plans
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/questions"} className="nav-link" aria-current="page">
                                Questions
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={"/articles"} className="nav-link" aria-current="page">
                                Articles
                            </NavLink>
                        </li>
                        <li className="nav-item">{getLogButton()}</li>
                        <li className="nav-item">{getProFeatures()}</li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
