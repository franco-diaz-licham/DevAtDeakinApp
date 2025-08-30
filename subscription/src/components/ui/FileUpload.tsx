/* eslint-disable @typescript-eslint/no-explicit-any */
import type { UseFormRegister } from "react-hook-form";

/** Functional component props. */
interface FileUploadPops {
    id: string;
    label: string;
    className?: string;
    register: UseFormRegister<any>;
}

/** File upload component. Supports images. */
export default function FileUpload(props: FileUploadPops) {
    return (
        <div className={props.className}>
            <label htmlFor={props.id} className="form-label">
                {props.label}
            </label>
            <input className="form-control border-dark-subtle" type="file" id={props.id} {...props.register(props.id)} accept=".png, .jpg, .jpeg" />
            <span className="small ms-2">Supported files: .png, .jpg, .jpeg</span>
        </div>
    );
}
