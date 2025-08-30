/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";

interface TextMarkdownDisplayProps {
    values: any;
    className?: string;
    styles?: object;
}

export default function TextMarkdownDisplay(props: TextMarkdownDisplayProps) {
    return (
        <div className={props.className} style={props.styles}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
                {props.values || "_Nothing to preview_"}
            </ReactMarkdown>
        </div>
    );
}
