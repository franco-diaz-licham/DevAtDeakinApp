/** Functional props. */
interface SearchFieldProps {
    id: string;
    icon: string;
    title: string;
    type: string;
    placeHolder?: string;
    className?: string;
    value?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/** Search fied functional components. */
export default function SearchField(props: SearchFieldProps) {
    return (
        <div className={props.className}>
            <div className="input-group">
                <span className="input-group-text border-dark-subtle" id="basic-addon1">
                    <i className={`bi bi-${props.icon}`}></i>
                </span>
                <input
                    id={props.id}
                    type={props.type}
                    onChange={props.onChange}
                    value={props.value}
                    className="form-control border-dark-subtle"
                    placeholder={props.placeHolder}
                    aria-label={props.title}
                    aria-describedby="basic-addon1"
                />
            </div>
        </div>
    );
}
