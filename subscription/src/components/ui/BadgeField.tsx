/** Function props. */
interface BadgeFieldProps {
    name: string;
    className?: string;
    colour?: string;
}
/** Badge component. */
export default function BadgeField(props: BadgeFieldProps) {
    return (
        <div className={props.className}>
            <span className={`badge bg-${props.colour ?? "primary"}`}>{props.name}</span>
        </div>
    );
}
