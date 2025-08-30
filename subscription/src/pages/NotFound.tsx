import { Link } from "react-router-dom";

/** Routable component used as a wild card when no routable page is found. */
export default function NotFound() {
    return (
        <div className="flex-column text-center">
            <h1>Page Not Found!</h1>
            <Link to={"/"}>
                <button className="btn btn-dark mt-3">
                    <i className="ms-3 bi bi-house-fill fs-5 me-2" />
                    Go Home
                </button>
            </Link>
        </div>
    );
}
