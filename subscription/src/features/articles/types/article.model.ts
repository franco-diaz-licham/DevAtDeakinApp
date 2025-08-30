import { Timestamp } from "firebase/firestore";

/** Article model as stored in the database. */
export interface ArticleModel {
    id: string;
    title: string;
    abstract: string;
    articleText: string;
    tags: string;
    rating: number | null;
    imageUrl: string | null;
    /** User who created the question. */
    uid: string;
    author: string;
    createdAt: Timestamp;
}

/** Used for posting an article to firestore. */
export interface ArticlePostDTO {
    title: string;
    abstract: string;
    articleText: string;
    tags: string;
    rating?: number;
    uid: string;
    imageUrl?: string;
    author: string;
}
