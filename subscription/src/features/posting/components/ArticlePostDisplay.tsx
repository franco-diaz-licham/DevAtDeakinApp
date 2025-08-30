import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import type PostFormData from "../types/formData.model";
import TextInput from "../../../components/ui/TextInput";
import FileUpload from "../../../components/ui/FileUpload";
import TextMarkdownInput from "../../../components/ui/TextMarkdownInput";
import TextArea from "../../../components/ui/TextArea";

/** Functional component props. */
interface ArticleDisplayProps {
    register: UseFormRegister<PostFormData>;
    errors: FieldErrors<PostFormData>;
    control: Control<PostFormData>;
}

/** Article subform. */
export default function ArticlePostDisplay(props: ArticleDisplayProps) {
    return (
        <>
            <TextArea id="title" className="mb-3" label="Title" placeholder="Enter a descriptive title"  showLabel={true} rows={2} required={true} register={props.register} errors={props.errors} />  
            <FileUpload id="images" className="mb-3" label="Upload Image" register={props.register} />
            <TextMarkdownInput id="abstract" label="Abstract" className="mb-3" placeholder="Enter a 1-paragraph abstract" minHeight={100} showLabel={true} required={true} control={props.control} errors={props.errors} />
            <TextMarkdownInput id="articleText" label="Article Text" placeholder="Enter your article text" className="mb-3" showLabel={true} required={true} control={props.control} errors={props.errors} />
            <TextInput id="tags" className="mb-3" label="Tags" placeholder="Please add up to 3 tags to describe what your article is about e.g. Java" showLabel={true} register={props.register} errors={props.errors} />
        </>
    );
}
