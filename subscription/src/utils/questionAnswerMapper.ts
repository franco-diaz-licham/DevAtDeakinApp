import type { UserProfileModel } from "../features/authentication/types/authentication.model";
import type { QuestionAnswerFormData } from "../features/posting/types/formData.model";
import type { QuestionAnswerPostDTO } from "../features/question/types/questionAnswer.model";

/** Maps from form to question create DTO. */
export function mapFormToQuestionAnswerCreate(data: QuestionAnswerFormData, user: UserProfileModel, questionId: string): QuestionAnswerPostDTO {
    return {
        uid: user.uid,
        description: data.description,
        questionId: questionId,
        userFirstName: user.firstName,
        userSurname: user.surname
    };
}
