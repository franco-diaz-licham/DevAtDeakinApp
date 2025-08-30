/** Functional props. */
interface CheckBoxFieldProps {
    id: string;
    label: string;
    value: string;
    className?: string;
    required?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/** Checkbox component.  */
export default function CheckBoxField(props: CheckBoxFieldProps) {
    return (
        <div className={props.className}>
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input border-dark-subtle"
                    id={props.id}
                    checked={props.value === "true"}
                    onChange={props.onChange}
                />
                <label className="form-check-label" htmlFor={props.id}>
                  {props.label} {props.required && <span className="text-danger">*</span>}
                </label>
            </div>
        </div>
    );
}
