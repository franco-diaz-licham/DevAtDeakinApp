import { useEffect, useState } from "react";
import { Timestamp } from "firebase/firestore";
import { type Params, useNavigate, useParams } from "react-router-dom";
import type { QuestionModel } from "../types/question.model";
import type { QuestionAnswerModel } from "../types/questionAnswer.model";
import type { UserProfileModel } from "../../authentication/types/authentication.model";
import { useAuth } from "../../../hooks/useAuth";
import { useToast } from "../../../hooks/useToast";
import { deleteQuestion, getQuestion, updateQuestion } from "../services/questionService";
import { getUser } from "../../authentication/services/userService";
import { createQuestionAnswer, getQuestionAnswersByQuestionId } from "../services/questionAnswerService";
import type { QuestionAnswerFormData, QuestionEditFormData } from "../../posting/types/formData.model";
import { mapFormToQuestionAnswerCreate } from "../../../utils/questionAnswerMapper";
import { mapFormToQuestionUpdate, mapQuestionToQuestionUpdate } from "../../../utils/questionMapper";
import { formatTimestampToDateTime } from "../../../utils/dateHelpers";
import QuestionTimelineCard from "../components/QuestionTimelineCard";
import QuestionEditForm from "../components/QuestionEditForm";
import QuestionAnswerForm from "../components/QuestionAnswerForm";
import styles from "../styles/QuestionDisplay.module.css";
import { useLoading } from "../../../hooks/useLoading";

/** Routable component to show all details about a question. */
export default function QuestionProfilePage() {
    const [question, setQuestion] = useState<QuestionModel>({ id: "", describeProblem: "", title: "", status: false, uid: "", createdAt: new Timestamp(0, 0), tags: "" });
    const [answers, setQuestionAnswers] = useState<QuestionAnswerModel[]>([]);
    const [author, setAuthor] = useState<UserProfileModel>({ uid: "", email: "", firstName: "", surname: "", createdAt: new Date(), tier: "free" });
    const { currentUserProfile } = useAuth();
    const { id }: Params<string> = useParams();
    const [editStatus, setEditStatus] = useState(false);
    const { show } = useToast();
    const navigate = useNavigate();
    const { setLoading } = useLoading();

    /** Loads all questions from the database. */
    const getData = async (id: string) => {
        setLoading(true);
        const model = await getQuestion(id);
        if (model) {
            setQuestion(model);
            const user = await getUser(model.uid);
            if (user) setAuthor(user);
            const answers = await getQuestionAnswersByQuestionId(model.id);
            if (answers) setQuestionAnswers(answers);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (!id) return;
        getData(id);
    }, []);

    /** Creates a new answer to a question. */
    const handleOnAnswerSubmission = async (data: QuestionAnswerFormData) => {
        setLoading(true);
        const mappedModel = mapFormToQuestionAnswerCreate(data, currentUserProfile!, question.id);
        const answer = await createQuestionAnswer(mappedModel);
        setQuestionAnswers([answer, ...answers]);
        show("Saved Succesfully!", { result: "success" });
        setLoading(false);
    };

    /** Updates the question status. */
    const handleMarkAsRead = async (data: boolean) => {
        setLoading(true);
        const newQuestion = mapQuestionToQuestionUpdate({ ...question, status: data });
        const updateDto = await updateQuestion(newQuestion, question.id);
        setQuestion(updateDto);
        show("Saved Succesfully!", { result: "success" });
        setLoading(false);
    };

    /** Updates the question details. */
    const handleQuestionEdit = async (data: QuestionEditFormData) => {
        setLoading(true);
        const newQuestion = mapFormToQuestionUpdate(data, question);
        const updateDto = await updateQuestion(newQuestion, question.id);
        setQuestion(updateDto);
        setEditStatus(false);
        show("Saved Succesfully!", { result: "success" });
        setLoading(false);
    };

    const handleDeleteQuestion = async () => {
        setLoading(true);
        await deleteQuestion(question.id);
        show("Deleted Succesfully!", { result: "success" });
        navigate("/questions");
        setLoading(false);
    };

    /** Gets answers timeline for a question. */
    const getAnswersTimeline = () => {
        if (answers.length > 0) {
            return (
                <div className={`${styles.timeline}`}>
                    {answers.map((a, index) => {
                        return <QuestionTimelineCard contentBody={a.description} author={`${a.userFirstName} ${a.userSurname}`} createdDate={formatTimestampToDateTime(a.createdAt)} key={index} className="mb-3" />;
                    })}
                </div>
            );
        }
        return <div className="d-flex m-4 align-items-center justify-content-center fst-italic">No answers yet...</div>;
    };

    /** Get question status. */
    const getStatus = () => {
        if (question.status) {
            return (
                <button className="btn btn-sm btn-success" onClick={() => handleMarkAsRead(false)}>
                    <i className="bi bi-check2-circle"> Answered</i>
                </button>
            );
        }
        return (
            <button className="btn btn-sm btn-secondary" onClick={() => handleMarkAsRead(true)}>
                <i className="bi bi-hourglass-split"> Unanswered</i>
            </button>
        );
    };

    /** Gets edit status. */
    const getEditStatus = () => {
        if (editStatus) {
            return (
                <button className="btn btn-sm btn-primary me-1" form="questionEditForm" type="submit">
                    <i className="bi bi-floppy"> Save</i>
                </button>
            );
        }
        return (
            <button
                type="button"
                className="btn btn-sm btn-warning me-1"
                onClick={(e) => {
                    e.preventDefault();
                    setEditStatus(true);
                }}
            >
                <i className="bi bi-pencil"> Edit</i>
            </button>
        );
    };

    return (
        <>
            <div className="mb-3 card shadow rounded-4 border-0 p-2">
                <div className="card-body">
                    <div className="row">
                        <h2 className="col-lg-8 col-md-6 col-12">Question Details</h2>
                        <div className="col-lg-4 col-md-6 col-12 text-lg-end text-md-end">
                            {getEditStatus()} {getStatus()}
                            <button className="btn btn-sm btn-danger ms-2" form="questionEditForm" type="button" onClick={handleDeleteQuestion}>
                                <i className="bi bi-trash3"> Delete</i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-3 card shadow rounded-4 border-0 p-2">
                <div className="card-body">
                    <QuestionEditForm editStatus={editStatus} author={author} question={question} onSubmit={handleQuestionEdit} />
                </div>
            </div>
            <div className="mb-3 card shadow rounded-4 border-0 p-2">
                <div className="card-body">
                    <div className="d-flex">
                        <h4 className="flex-grow-1 mb-3">Your Answer</h4>
                        <div className="justify-content-end">
                            <button type="submit" form="answerForm" className="btn btn-sm btn-primary">
                                <i className="bi bi-send-check"> Submit</i>
                            </button>
                        </div>
                    </div>
                    <QuestionAnswerForm onSubmit={handleOnAnswerSubmission} />
                </div>
            </div>
            <div className="mb-3 card shadow rounded-4 border-0 p-2">
                <div className="card-body">
                    <h4>Timeline</h4>
                    {getAnswersTimeline()}
                </div>
            </div>
        </>
    );
}
