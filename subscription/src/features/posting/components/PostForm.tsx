import { useState } from "react";
import { useForm } from "react-hook-form";
import type PostFormData from "../types/formData.model";
import { SubFormType } from "../types/subFormType";
import RadioInput from "../../../components/ui/RadioInput";
import ArticlePostDisplay from "./ArticlePostDisplay";
import QuestionPostDisplay from "./QuestionPostDisplay";

/** Functional component props. */
interface PostFormProps {
    onSubmit: (Data: PostFormData) => void;
}

/** Form component used for submitting a new article or question. */
export default function PostForm(props: PostFormProps) {
    const [subFormType, setSubFormType] = useState(SubFormType.Question);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        clearErrors,
    } = useForm<PostFormData>();

    /** Determine what subform to choose from. Either a question or an article. */
    const getSubForm = () => (subFormType === SubFormType.Question ? <QuestionPostDisplay control={control} register={register} errors={errors} /> : <ArticlePostDisplay control={control} register={register} errors={errors} />);

    /** Handle the change and set the state variable in order to render the correct snbform. */
    const handleSetSubFormTypeChanged = (e: React.ChangeEvent<HTMLInputElement>) => setSubFormType(Number(e.target.value));

    /** Reset form. */
    const handleResetChanged = () => {
        reset();
        clearErrors();
        setSubFormType(SubFormType.Question);
    };

    return (
        <div className="mb-3 card shadow rounded-4 border-0 p-4">
            <div className="card-body">
                <form id="myForm" onSubmit={handleSubmit((data) => props.onSubmit(data))} noValidate>
                    <div className="mb-3">
                        <label className="form-label fw-bold text-uppercase d-block bg-dark-subtle py-2 px-3 m-0">New Post</label>
                        <br />
                        <div className="ms-2">
                            <label htmlFor="subFormType" className="me-3">
                                Select Post Type:
                            </label>
                            <RadioInput id="subFormType" label="Question" className="form-check form-check-inline" value={SubFormType.Question} register={register} checked={subFormType === SubFormType.Question} onChange={handleSetSubFormTypeChanged} />
                            <RadioInput id="subFormType" label="Article" className="form-check form-check-inline" value={SubFormType.Article} register={register} checked={subFormType === SubFormType.Article} onChange={handleSetSubFormTypeChanged} />
                        </div>
                    </div>
                    <div className="">
                        <label className="form-label fw-bold text-uppercase d-block bg-dark-subtle py-2 px-3 m-0">What do you want to ask or share</label>
                        <br />
                        {getSubForm()}
                    </div>
                    <div className="d-flex gap-3 justify-content-end mt-5">
                        <button type="reset" className="btn btn-secondary px-4 text-uppercase fw-bold" onClick={handleResetChanged}>
                            Reset
                        </button>
                        <button type="submit" className="btn btn-primary px-4 text-uppercase fw-bold">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
