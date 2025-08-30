export default function Footer() {
    return (
        <footer>
            <div className="border-top bg-dark">
                <div className="container-xxl px-5 py-3">
                    <div className="row g-2 text-white text-center align-items-center">
                        <div className="col-lg-4">
                            <h5>Explore</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-white-50">
                                        Home
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-white-50">
                                        Questions
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-white-50">
                                        Articles
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-white-50">
                                        Tutorials
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-4">
                            <h5>Support</h5>
                            <ul className="nav flex-column">
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-white-50">
                                        FAQs
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-white-50">
                                        Help
                                    </a>
                                </li>
                                <li className="nav-item mb-2">
                                    <a href="#" className="nav-link p-0 text-white-50">
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-lg-4">
                            <h5>Stay Connected</h5>
                            <div className="d-flex justify-content-center">
                                <i className="bi bi-facebook fs-2"></i>
                                <i className="bi bi-twitter fs-2 mx-4"></i>
                                <i className="bi bi-instagram fs-2"></i>
                            </div>
                        </div>

                        <div className="col-12 d-flex align-items-center flex-column">
                            <p className="border-top border-white pt-3 mt-2 text-white text-center m-0 w-75">© 2025 Dev@Deakin</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
