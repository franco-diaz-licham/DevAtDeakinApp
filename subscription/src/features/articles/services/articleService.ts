import { collection, addDoc, Timestamp } from "firebase/firestore";
import type { ArticlePostDTO } from "../types/article.model";
import { db } from "../../../app/services/firebase";
import { delay } from "../../../utils/apiHelpers";

/** Method which creates an entry into the Article collection. */
export async function createArticle(data: ArticlePostDTO) {
    const docRef = collection(db, "articles");
    const model = {
        ...data,
        createdAt: Timestamp.now(),
    };
    const art = await addDoc(docRef, model);
    await delay(500);
    return {
        id: art.id,
        ...model,
    };
}
