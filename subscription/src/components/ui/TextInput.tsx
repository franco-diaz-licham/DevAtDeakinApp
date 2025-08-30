/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FieldErrors, UseFormRegister } from "react-hook-form";

/** Functional props. */
interface TextInputProps {
    id: string;
    label: string;
    required?: boolean;
    className?: string;
    placeholder?: string;
    showLabel: boolean;
    type?: string;
    errors: FieldErrors<any>;
    register: UseFormRegister<any>;
}

/** Text input component. Supports only single lines. */
export default function TextInput(props: TextInputProps) {
    const validation = {
        required: { value: props.required ?? false, message: `${props.label} is required` },
    };

    return (
        <div className={props.className}>
            {props.showLabel && (
                <label htmlFor={props.id} className="form-label">
                    {props.label}{props.required && <span className="text-danger">*</span>}
                </label>
            )}
            <input id={props.id} type={props.type ?? "text"} className={`form-control ${props.errors[props.id] ? "is-invalid" : "border-dark-subtle"}`} placeholder={props.placeholder} {...props.register(props.id, validation)} />
            {props.errors[props.id] && <div className="text-danger small">{props.errors[props.id]?.message?.toString()}</div>}
        </div>
    );
}
