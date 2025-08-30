/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldErrors, UseFormRegister } from "react-hook-form";

/** Funtional component props. */
interface TextAreaProps {
    id: string;
    label: string;
    rows?: number;
    required?: boolean;
    className?: string;
    placeholder?: string;
    showLabel: boolean;
    errors: FieldErrors<any>;
    register: UseFormRegister<any>;
}

/** Text area component. Supports multiple lines. */
export default function TextArea(props: TextAreaProps) {
    const validation = {
        required: { value: props.required ? true : false, message: `${props.label} is required` },
    };

    return (
        <div className={props.className}>
            {props.showLabel && (
                <label htmlFor={props.id} className="form-label">
                    {props.label}{props.required && <span className="text-danger">*</span>}
                </label>
            )}
            <textarea
                id={props.id}
                className={`form-control ${props.errors[props.id] ? "is-invalid" : "border-dark-subtle"}`}
                rows={props.rows ?? 3}
                required={props.required ?? false}
                placeholder={props.placeholder}
                {...props.register(props.id, validation)}
            />
            {props.errors[props.id] && <div className="text-danger small">{props.errors[props.id]?.message?.toString()}</div>}
        </div>
    );
}
