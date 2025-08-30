import type { ArticleModel } from "../types/article.model";
import ArticleCard from "./ArticleCard";

interface ArticleDisplayProps {
    title: string;
    articles: ArticleModel[];
}

export default function ArticleDisplay(props: ArticleDisplayProps) {
    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <h2 className="text-center mt-4">{props.title}</h2>
            <div className="row g-4 mt-2 w-100">
                {props.articles.map((article: ArticleModel) => (
                    <ArticleCard article={article} className="col-lg-4 col-md-4 col-sm-6 d-flex justify-content-center" key={article.id} />
                ))}
            </div>
            <button className="btn btn-dark my-4 px-5 shadow">See All Articles</button>
        </div>
    );
}
