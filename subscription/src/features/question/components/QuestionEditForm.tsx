import { useForm, } from "react-hook-form";
import { formatTimestampToDateTime } from "../../../utils/dateHelpers";
import { useEffect } from "react";
import type { QuestionModel } from "../types/question.model";
import type { UserProfileModel } from "../../authentication/types/authentication.model";
import type { QuestionEditFormData } from "../../posting/types/formData.model";
import TextInput from "../../../components/ui/TextInput";
import TextArea from "../../../components/ui/TextArea";
import BadgeField from "../../../components/ui/BadgeField";
import CreationDetails from "../../../components/ui/CreationDetails";
import TextMarkdownInput from "../../../components/ui/TextMarkdownInput";
import TextMarkdownDisplay from "../../../components/ui/TextMarkdownDisplay";

/** Functional props. */
interface QuestionEditFormProps {
    question: QuestionModel;
    author: UserProfileModel;
    className?: string;
    editStatus: boolean;
    onSubmit: (Data: QuestionEditFormData) => void;
}

export default function QuestionEditForm(props: QuestionEditFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<QuestionEditFormData>({
        defaultValues: {
            title: props.question.title,
            describeProblem: props.question.describeProblem,
            tags: props.question.tags,
        },
    });

    useEffect(() => {
        if (props.editStatus) {
            reset({
                title: props.question.title,
                describeProblem: props.question.describeProblem,
                tags: props.question.tags,
            });
        }
    }, [props.question, props.editStatus, reset]);

    const getTitle = () => {
        if (props.editStatus) {
            return <TextArea id="title" showLabel={false} label="Title" className="mb-3" rows={2} placeholder="Start your question with how, what, why, etc..." required={true} register={register} errors={errors} />;
        }
        return <h4>{props.question.title}</h4>;
    };

    const getDescription = () => {
        if (props.editStatus) {
            return <TextMarkdownInput id="describeProblem" label="describeProblem" placeholder="Enter your answer" showLabel={false} required={true} control={control} errors={errors} />;
        }
        return <TextMarkdownDisplay values={props.question.describeProblem} />;
    };

    const getTags = () => {
        if (props.editStatus) {
            return <TextInput id="tags" className="mb-3" label="Tags" placeholder="Please add up to 3 tags to describe what your article is about e.g. Java" showLabel={false} register={register} errors={errors} />;
        }
        return props.question.tags.split(" ").map((tag, index) => <BadgeField className="d-inline me-1" name={tag} key={index} colour="secondary" />);
    };

    return (
        <form id="questionEditForm" className={`border-1 rounded-4 ${props.className}`} onSubmit={handleSubmit(props.onSubmit)} noValidate>
            {getTitle()}
            <div className="mb-2">{getTags()}</div>
            <div className="mb-3">
                <CreationDetails author={`${props.author.firstName} ${props.author.surname}`} createdDate={formatTimestampToDateTime(props.question.createdAt)} />
            </div>
            {getDescription()}
        </form>
    );
}
