import { Timestamp } from "firebase/firestore";

/** Question model as stored in the database. */
export interface QuestionModel {
    /** id for a question/ */
    id: string;
    /** Title of question. */
    title: string;
    /** Description of a problem */
    describeProblem: string;
    /** Tags associated with the question. */
    tags: string;
    /** When the question was created. */
    createdAt: Timestamp;
    /** User who created the question. */
    uid: string;
    /**  Used to determine whether a question is visible to a user. If user is present, then it has been flagged as hidden. */
    usersHidden?: string[];
    /** Status if question was answered or not. */
    status: boolean;
}

/** DTO used to create a new question in firestore. */
export interface QuestionPostDTO {
    title: string;
    describeProblem: string;
    tags: string;
    uid: string;
}

/** DTO used to update a question record. */
export interface QuestionUpdateDTO {
    title: string;
    describeProblem: string;
    tags: string;
    createdAt: Timestamp;
    uid: string;
    usersHidden?: string[];
    status: boolean;
}
