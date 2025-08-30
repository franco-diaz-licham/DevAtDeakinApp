/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegister } from "react-hook-form";

/** Functional component props. */
interface RadioInputProps {
    id: string;
    label: string;
    value: number;
    required?: boolean;
    checked: boolean;
    className?: string;
    register: UseFormRegister<any>;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/** Radio component. */
export default function RadioInput(props: RadioInputProps) {
    return (
        <div className={props.className}>
            <input className="form-check-input border-dark-subtle" type="radio" id={props.id} value={props.value} {...props.register("subFormType", { required: props.required ?? false })} checked={props.checked} onChange={props.onChange} />
            <label className="form-check-label" htmlFor={props.id}>
                {props.label}
            </label>
        </div>
    );
}
