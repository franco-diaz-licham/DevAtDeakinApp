import Hero from "../components/Hero";
import ArticleDisplay from "../../articles/components/ArticleDisplay";
import { articles, tutorials } from "../services/defaultData";

/** Home page. */
export default function HomePage() {
    return (
        <>
            <Hero />
            <ArticleDisplay title="Featured Articles" articles={articles} />
            <ArticleDisplay title="Featured Tutorials" articles={tutorials} />
        </>
    );
}
