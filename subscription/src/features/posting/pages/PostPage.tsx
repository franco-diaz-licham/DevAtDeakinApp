/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../hooks/useUser";
import { useToast } from "../../../hooks/useToast";
import type PostFormData from "../types/formData.model";
import { uploadImage } from "../../../app/services/fileService";
import { mapFormToArticleCreate } from "../../../utils/articleMapper";
import { createArticle } from "../../articles/services/articleService";
import { mapFormToQuestionCreate } from "../../../utils/questionMapper";
import { createQuestion } from "../../question/services/questionService";
import PostForm from "../components/PostForm";
import { SubFormType } from "../types/subFormType";
import { useLoading } from "../../../hooks/useLoading";

/** Routable component used to submit a new question or article. */
export default function PostPage() {
    const { userProfile } = useUser();
    const { show } = useToast();
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    /** Handles when the form is submitted. */
    const handleSubmitChanged = async (data: PostFormData) => {
        setLoading(true);
        try {
            if (Number(data.subFormType) === SubFormType.Question) await saveQuestion(data);
            else await saveArticle(data);
            show("Saved Succesfully!", { result: "success" });
            navigate("/");
        } catch (e: any) {
            show(`Error: ${e}`, { result: "danger" });
        }
        setLoading(false);
    };

    /** Save submitted article. */
    const saveArticle = async (data: PostFormData) => {
        let imageUrl = undefined;
        if (data.images && data.images.length > 0) imageUrl = await uploadImage(data.images[0]);
        const model = mapFormToArticleCreate(data, userProfile!.uid, `${userProfile?.firstName} ${userProfile?.firstName}`, imageUrl);
        await createArticle(model);
    };

    /** Save submitted question. */
    const saveQuestion = async (data: PostFormData) => {
        const model = mapFormToQuestionCreate(data, userProfile!.uid);
        await createQuestion(model);
    };

    return <PostForm onSubmit={handleSubmitChanged} />;
}
