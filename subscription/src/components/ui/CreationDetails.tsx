/** Functional props. */
interface CreationDetailsProps {
    createdDate: string;
    author: string;
}

/** Displays creation details including authoer and created date. */
export default function CreationDetails(props: CreationDetailsProps) {
    return (
        <div className="d-flex">
            <p className="card-subtitle text-body-secondary me-3">
                <i className="bi bi-person-fill"></i> {props.author}
            </p>
            <p className="card-subtitle text-body-secondary">
                <i className="bi bi-calendar-date-fill"></i> {props.createdDate}
            </p>
        </div>
    );
}
