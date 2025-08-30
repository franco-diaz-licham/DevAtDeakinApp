import type { ArticlePostDTO } from "../features/articles/types/article.model";
import type PostFormData from "../features/posting/types/formData.model";

/** Maps from form to article create DTO. */
export function mapFormToArticleCreate(data: PostFormData, userId: string, author: string, imageUrl?: string): ArticlePostDTO {
    const base: ArticlePostDTO = {
        uid: userId,
        author, 
        title: data.title,
        abstract: data.abstract,
        articleText: data.articleText,
        tags: data.tags,
    };

    return imageUrl ? { ...base, imageUrl } : base;
}
