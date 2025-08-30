import { useForm } from "react-hook-form";
import type { QuestionAnswerFormData } from "../../posting/types/formData.model";
import TextMarkdownInput from "../../../components/ui/TextMarkdownInput";

/** Functional props. */
interface QuestionAnswerFormProps {
    onSubmit: (Data: QuestionAnswerFormData) => void;
}

/** Form to propose and answer to a question. */
export default function QuestionAnswerForm(props: QuestionAnswerFormProps) {
    const {
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<QuestionAnswerFormData>();

    /** Submits and resets the form. */
    const handleSubmission = (data: QuestionAnswerFormData) => {
        reset();
        return props.onSubmit(data);
    };

    return (
        <form id="answerForm" onSubmit={handleSubmit(handleSubmission)} noValidate>
            <TextMarkdownInput id="description" label="description" placeholder="Enter your answer" className="mb-3" showLabel={false} required={true} control={control} errors={errors} />
        </form>
    );
}
