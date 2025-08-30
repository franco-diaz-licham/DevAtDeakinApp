import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type PostFormData from "../types/formData.model";
import TextInput from "../../../components/ui/TextInput";
import TextMarkdownInput from "../../../components/ui/TextMarkdownInput";
import TextArea from "../../../components/ui/TextArea";

/** Functional props. */
interface QuestionDisplayProps {
    register: UseFormRegister<PostFormData>;
    errors: FieldErrors<PostFormData>;
    control: Control<PostFormData>;
}

/** Question subform with Markdown editor + live preview */
export default function QuestionPostDisplay(props: QuestionDisplayProps) {
    return (
        <>
            <TextArea id="title" className="mb-3" label="Title" placeholder="Enter a descriptive title" showLabel={true} rows={2} required={true} register={props.register} errors={props.errors} />
            <TextMarkdownInput showLabel={true} id="describeProblem" label="Describe your problem" className="mb-3" required={true} control={props.control} errors={props.errors} />
            <TextInput id="tags" label="Tags" className="mb-3" showLabel={true} required={false} register={props.register} errors={props.errors} />
        </>
    );
}
