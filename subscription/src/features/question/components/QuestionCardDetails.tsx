import { forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import { formatTimestampToDateTime } from "../../../utils/dateHelpers";
import type { QuestionModel } from "../types/question.model";
import type { UserProfileModel } from "../../authentication/types/authentication.model";
import BadgeField from "../../../components/ui/BadgeField";
import CreationDetails from "../../../components/ui/CreationDetails";

/** Functional props. */
interface QuestionCardDetailsProps {
    value: QuestionModel;
    author: UserProfileModel;
}

/** Shows full title and question details for the user. */
const QuestionCardDetails = forwardRef<HTMLDivElement, QuestionCardDetailsProps>((props, ref) => {
    const navigate = useNavigate();
    /** Gets question status based on if it was answered or not. */
    const getQuestionStatus = () => {
        if (props.value.status) return <i className="bi bi-check2-circle text-success"> Answered</i>;
        return <i className="bi bi-hourglass-split text-secondary"> Unanswered</i>;
    };

    return (
        <div className="modal fade" tabIndex={-1} ref={ref}>
            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{props.value.title}</h5>
                        <button type="button" className="btn-close me-2" data-bs-dismiss="modal" aria-label="Close" onClick={() => (document.activeElement as HTMLElement)?.blur()} />
                    </div>
                    <div className="modal-body">
                        <div className="mb-2">
                            {props.value.tags.split(" ").map((tag, index) => (
                                <BadgeField className="d-inline me-1" name={tag} key={index} colour="secondary" />
                            ))}
                        </div>
                        <div className="mb-3">
                            <CreationDetails author={`${props.author.firstName} ${props.author.surname}`} createdDate={formatTimestampToDateTime(props.value.createdAt)} />
                        </div>
                        <p>{props.value.describeProblem}</p>
                    </div>
                    <div className="modal-footer">
                        <div className="flex-grow-1">
                            <div>{getQuestionStatus()}</div>
                        </div>
                        <button type="button" className="btn btn-success" data-bs-dismiss="modal" aria-label="See More" onClick={() => navigate(`/question/${props.value.id}`)}>
                            <i className="bi bi-arrow-right-circle"> See more</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default QuestionCardDetails;
