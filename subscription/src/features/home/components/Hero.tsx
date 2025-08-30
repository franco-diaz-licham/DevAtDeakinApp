import hero1 from "../../../assets/hero1.jpg"
import hero2 from "../../../assets/hero2.jpg"
import hero3 from "../../../assets/hero3.jpg"

export default function Hero() {
    return (
        <>
            <section id="hero" className="position-relative">
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="4000">
                            <img src={hero1} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block fw-light small fst-italic">
                                <h6 className="text-capitalize text-white">Many articles for many languages!</h6>
                                <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, accusantium?</p>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="4000">
                            <img src={hero2} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block fw-light small fst-italic">
                                <h6 className="text-capitalize text-white">Look into beautiful desktop setups!</h6>
                                <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime, vitae.</p>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="4000">
                            <img src={hero3} className="d-block w-100" alt="..." />
                            <div className="carousel-caption d-none d-md-block fw-light small fst-italic">
                                <h6 className="text-capitalize text-white">Don't be a lonely coder!</h6>
                                <p className="text-white">Lorem ipsum dolor sit amet consectetur adipisicing.</p>
                            </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
                <div className="position-absolute bottom-50 w-100 text-center text-white">
                    <h1 className="fw-bold">Dev@Deakin</h1>
                    <p className="fw-bold fst-italic">
                        Welcome to Sydney's #1 Website for Developers <br /> Find articles, tutorials and more...!
                    </p>
                </div>
            </section>
        </>
    );
}
