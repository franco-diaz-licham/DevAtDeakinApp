import type { ArticleModel } from "../types/article.model";


export default function ArticleCard(props: ArticleProps) {
    return (
        <div className={props.className}>
            <div className="card text-center shadow rounded-4" style={{ width: "18rem" }}>
                <img src={props.article.imageUrl?? ""} className="card-img-top rounded-top-4" height={"55%"} alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{props.article.title}</h5>
                    <small className="d-flex justify-content-between mb-2 px-3">
                        <span >
                            <i className="bi bi-star-fill fs-6 text-warning me-2" />
                           <strong> {props.article.rating}/5</strong>
                        </span>
                        <span className="fw-bold">by: {props.article.author}</span>
                    </small>
                    <p className="card-text">{props.article.abstract}</p>
                    <a href="#" className="btn btn-secondary">
                        Read More...
                    </a>
                </div>
            </div>
        </div>
    );
}

interface ArticleProps {
    article: ArticleModel;
    className: string;
}
