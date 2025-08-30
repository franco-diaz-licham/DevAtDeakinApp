import { Timestamp } from "firebase/firestore";

/** Question answers model as stored in the database. */
export interface QuestionAnswerModel {
    /** id for a question answer. */
    id: string;
    /** Related question. */
    questionId: string;
    /** description of the answer to the question. */
    description: string;
    /** When the question was created. */
    createdAt: Timestamp;
    /** User who answered the question. */
    uid: string;
    userFirstName: string;
    userSurname: string;
}

/** DTO used to create a new question answer in the database. */
export interface QuestionAnswerPostDTO {
    description: string;
    questionId: string;
    uid: string;
    userFirstName: string;
    userSurname: string;
}
