import CreationDetails from "../../../components/ui/CreationDetails";
import TextMarkdownDisplay from "../../../components/ui/TextMarkdownDisplay";

/** Functional props. */
interface QuestionTimelineCardProps {
    createdDate: string;
    author: string;
    contentBody: string;
    className?: string;
}

/** Card to display answers timeline. */
export default function QuestionTimelineCard(props: QuestionTimelineCardProps) {
    return (
        <div className={`card ${props.className}`}>
            <div className="card-header">
                <CreationDetails author={props.author} createdDate={props.createdDate} />
            </div>
            <TextMarkdownDisplay values={props.contentBody} className="card-body" />
        </div>
    );
}
