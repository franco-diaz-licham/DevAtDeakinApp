import removeMd from "remove-markdown";

/** Convert Markdown to plain text and trim it for previews. */
export function markDownToPlain(md: string, maxLength = 160): string {
    const text = removeMd(md, { useImgAltText: true, stripListLeaders: true });
    const clean = text.replace(/\s+/g, " ").trim();
    return textContinue(clean, maxLength);
}

/** Setups text to display as a continum. */
export function textContinue(text: string, maxLength = 160): string {
    return text.length <= maxLength ? text : text.slice(0, maxLength - 1) + "…";
}
