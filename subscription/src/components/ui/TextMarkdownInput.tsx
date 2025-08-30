/* eslint-disable @typescript-eslint/no-explicit-any */
import CodeMirror from "@uiw/react-codemirror";
import { markdown } from "@codemirror/lang-markdown";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { useMemo, useState } from "react";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import { useBootstrapTheme } from "../../hooks/userBootstrapTheme";
import TextMarkdownDisplay from "./TextMarkdownDisplay";

/** Functional props. */
interface TextMarkDownProps {
    id: string;
    label: string;
    required?: boolean;
    className?: string;
    placeholder?: string;
    minHeight?: number;
    showLabel?: boolean;
    errors: FieldErrors<any>;
    control: Control<any>;
}

export default function TextMarkdownInput(props: TextMarkDownProps) {
    const [tab, setTab] = useState<"write" | "preview">("write");
    const { theme } = useBootstrapTheme();
    const cmTheme = theme === "dark" ? oneDark : undefined;

    // Editor extensions
    const cmExtensions = useMemo(() => [markdown(), javascript(), EditorView.lineWrapping], []);
    return (
        <div className={`${props.className}`}>
            <div className="row">
                {props.showLabel && (
                    <label htmlFor={props.id} className="form-label col-7 flex-lg-grow-1">
                        {props.label}{props.required && <span className="text-danger">*</span>}
                    </label>
                )}
                <div className="btn-group mb-2 col-2" role="tablist" aria-label="Editor tabs">
                    <button type="button" className={`btn btn-sm ${tab === "write" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setTab("write")}>
                        Write
                    </button>
                    <button type="button" className={`btn btn-sm ${tab === "preview" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setTab("preview")}>
                        Preview
                    </button>
                </div>
            </div>
            <Controller
                name={props.id}
                control={props.control}
                rules={{ required: `${props.label} is required` }}
                render={({ field }) =>
                    tab === "write" ? (
                        <CodeMirror
                            value={field.value || ""}
                            className={`form-control ${props.errors[props.id] ? "is-invalid" : "border-dark-subtle"}`}
                            minHeight={`${props.minHeight ?? 260}px`}
                            theme={cmTheme}
                            placeholder={props.placeholder}
                            extensions={cmExtensions}
                            onChange={(val) => field.onChange(val)}
                            onBlur={field.onBlur}
                            basicSetup={{ lineNumbers: true, highlightActiveLineGutter: false }}
                        />
                    ) : (
                        <TextMarkdownDisplay styles={{ minHeight: (props.minHeight ?? 260) + 13 }} values={field.value} className="form-control border-dark-subtle p-3" />
                    )
                }
            />
            {props.errors[props.id] && <div className="text-danger small mt-1">{String(props.errors[props.id]?.message)}</div>}
            <div className="form-text">
                <pre className="mb-0 mt-1">
                    Fenced blocks: <code>{`\`\`\`js console.log("Hello!"); \`\`\``}</code>
                </pre>
            </div>
        </div>
    );
}
