import type { SubFormType } from "./subFormType";

/** DTO used for posting a question or article. */
export default interface PostFormData {
    subFormType: typeof SubFormType;
    title: string;
    abstract: string;
    articleText: string;
    describeProblem: string;
    images?: FileList;
    tags: string;
}

/** DTO used for answering a question. */
export interface QuestionAnswerFormData {
    description: string;
}

export interface QuestionEditFormData {
    title: string;
    describeProblem: string;
    tags: string;
}
