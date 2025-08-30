import { addDoc, collection, getDocs, orderBy, query, Timestamp, where } from "firebase/firestore";
import type { QuestionAnswerModel, QuestionAnswerPostDTO } from "../types/questionAnswer.model";
import { db } from "../../../app/services/firebase";
import { delay } from "../../../utils/apiHelpers";

/** Method which creates an entry into the Question Collection. */
export async function createQuestionAnswer(data: QuestionAnswerPostDTO) {
    const docRef = collection(db, "questionAnswers");
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

/** Get question answers from the database based on a questionId. */
export async function getQuestionAnswersByQuestionId(questionId: string): Promise<QuestionAnswerModel[]> {
    const docRef = collection(db, "questionAnswers");
    const q = query(docRef, where("questionId", "==", questionId), orderBy("createdAt", "desc"));
    const docSnap = await getDocs(q);
    await delay(500);
    const questions: QuestionAnswerModel[] = docSnap.docs.map((doc) => {
        return {
            id: doc.id,
            ...(doc.data() as Omit<QuestionAnswerModel, "id">),
        };
    });
    return questions;
}
