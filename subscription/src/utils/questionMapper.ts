/* eslint-disable @typescript-eslint/no-unused-vars */
import type { QuestionEditFormData } from "../features/posting/types/formData.model";
import type PostFormData from "../features/posting/types/formData.model";
import type { QuestionModel, QuestionPostDTO, QuestionUpdateDTO } from "../features/question/types/question.model";


/** Maps from form to question create DTO. */
export function mapFormToQuestionCreate(data: PostFormData, userId: string): QuestionPostDTO {
    return {
        uid: userId,
        title: data.title,
        describeProblem: data.describeProblem,
        tags: data.tags,
    };
}

/** Maps from form and model to update DTO. */
export function mapFormToQuestionUpdate(data: QuestionEditFormData, question: QuestionModel): QuestionUpdateDTO {
    const base = {
        createdAt: question.createdAt,
        status: question.status,
        uid: question.uid,
        title: data.title,
        describeProblem: data.describeProblem,
        tags: data.tags,
    };

    return question.usersHidden ? {...base, usersHidden: question.usersHidden } : base;
}

/** Maps from question model to Question update DTO. */
export function mapQuestionToQuestionUpdate(question: QuestionModel): QuestionUpdateDTO {
    const { id, ...rest } = question;
    return { ...rest };
}
