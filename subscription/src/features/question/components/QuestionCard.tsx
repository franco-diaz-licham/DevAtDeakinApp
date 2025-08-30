import { useRef, useState } from "react";
import { Modal } from "bootstrap";
import { formatTimestampToDateTime } from "../../../utils/dateHelpers";
import styles from "../styles/QuestionCard.module.css";
import { useAuth } from "../../../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import QuestionCardDetails from "./QuestionCardDetails";
import type { QuestionModel } from "../types/question.model";
import type { UserProfileModel } from "../../authentication/types/authentication.model";
import BadgeField from "../../../components/ui/BadgeField";
import { getUser } from "../../authentication/services/userService";
import { markDownToPlain, textContinue } from "../../../utils/textHelpers";

/** Functional props. */
interface QuestionCardProps {
    value: QuestionModel;
    onHidden: (id: QuestionModel) => void;
    onShow: (id: QuestionModel) => void;
}

/** Displays basic information for users. */
export default function QuestionCard(props: QuestionCardProps) {
    const { currentUser } = useAuth();
    const [author, setAuthor] = useState<UserProfileModel>({ uid: "", email: "", firstName: "", surname: "", createdAt: new Date(), tier: "free" });
    const modalRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    /** Gets hidden icon according to hidden state. */
    const getHiddenIcon = () => {
        if (props.value.usersHidden?.includes(currentUser!.uid!)) return <i className="ms-3 bi bi-eye-fill text-danger fs-4" onClick={() => props.onShow(props.value)} />;
        return <i className="ms-3 bi bi-eye-slash-fill text-danger fs-4" onClick={() => props.onHidden(props.value)} />;
    };

    /** Gets question status based on if it was answered or not. */
    const getQuestionStatus = () => {
        if (props.value.status) return <i className="bi bi-check2-circle text-success"> Answered</i>;
        return <i className="bi bi-hourglass-split text-secondary"> Unanswered</i>;
    };

    /** Display more details */
    const handleShowCardDetails = async () => {
        if (!modalRef.current) return;
        const user = await getUser(props.value.uid);
        if (user) setAuthor(user);
        const modal = new Modal(modalRef.current);
        modal.show();
    };

    return (
        <>
            <div className={`card shadow rounded-4 border-0 p-2 ${styles.questionCard}`} style={{ height: "17rem" }}>
                <div className="card-body" onClick={() => navigate(`/question/${props.value.id}`)}>
                    <h5 className="card-title overflow-hidden" style={{ height: "3rem" }}>
                        {textContinue(props.value.title, 65)}
                    </h5>
                    <div className="mb-2">
                        {props.value.tags.split(" ").map((tag, index) => (
                            <BadgeField className="d-inline me-1" name={tag} key={index} colour="secondary" />
                        ))}
                    </div>
                    <p className="card-subtitle mb-2 text-body-secondary">
                        <i className="bi bi-calendar-date-fill"></i> {formatTimestampToDateTime(props.value.createdAt)}
                    </p>
                    <p className="card-text overflow-hidden" style={{ height: "3rem" }}>
                        {markDownToPlain(props.value.describeProblem, 95)}
                    </p>
                </div>
                <div className="card-footer d-flex">
                    <div className="justify-content-start flex-grow-1">{getQuestionStatus()}</div>
                    <div className="justify-content-end">
                        <Link to={""} onClick={handleShowCardDetails}>
                            <i className="bi bi-zoom-in fs-4" />
                        </Link>
                        <Link to={""}>{getHiddenIcon()}</Link>
                    </div>
                </div>
            </div>
            <QuestionCardDetails ref={modalRef} value={props.value} author={author} />
        </>
    );
}
