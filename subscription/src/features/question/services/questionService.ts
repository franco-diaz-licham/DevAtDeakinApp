import { collection, addDoc, Timestamp, getDocs, doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import type { QuestionModel, QuestionPostDTO, QuestionUpdateDTO } from "../types/question.model";
import { db } from "../../../app/services/firebase";
import { delay } from "../../../utils/apiHelpers";

/** Method which creates an entry into the Question Collection. */
export async function createQuestion(data: QuestionPostDTO) {
    const docRef = collection(db, "questions");
    const model = {
        ...data,
        createdAt: Timestamp.now(),
        status: false,
    };
    const art = await addDoc(docRef, model);
    await delay(500);
    return {
        id: art.id,
        ...model,
    };
}

/** Method which updates an entry in the Question Collection. */
export async function updateQuestion(data: QuestionUpdateDTO, id: string): Promise<QuestionModel> {
    const docRef = doc(db, "questions", id);
    await setDoc(docRef, data);
    await delay(500);
    return { id, ...data };
}

/** Gets question from the database. */
export async function getQuestion(id: string): Promise<QuestionModel | null> {
    const docRef = doc(db, "questions", id);
    const docSnap = await getDoc(docRef);
    await delay(500);
    if (docSnap.exists()) {
        const model = docSnap.data() as QuestionModel;
        return { ...model, id };
    }
    return null;
}

/** Deletes a question by its ID from the database. */
export async function deleteQuestion(id: string): Promise<void> {
    const docRef = doc(db, "questions", id);
    await deleteDoc(docRef);
    await delay(500);
}

/** Get questions from the database. */
export async function getQuestions(): Promise<QuestionModel[]> {
    const docRef = collection(db, "questions");
    const docSnap = await getDocs(docRef);
    await delay(500);
    const questions: QuestionModel[] = docSnap.docs.map((doc) => {
        return {
            id: doc.id,
            ...(doc.data() as Omit<QuestionModel, "id">),
        };
    });
    return questions;
}
