import { Timestamp } from "firebase/firestore";

/** Fill time with leading 0. */
const pad = (n: number) => n.toString().padStart(2, "0");

/**Method to convert firebase Timestamp to date format */
export function formatTimestampToDateTime(timestamp: Timestamp): string {
    const date = timestamp.toDate();
    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1);
    const year = date.getFullYear().toString().slice(-2);

    const hours24 = date.getHours();
    const hours12 = hours24 % 12 || 12;
    const minutes = pad(date.getMinutes());
    const ampm = hours24 < 12 ? "AM" : "PM";

    return `${day}-${month}-${year} ${pad(hours12)}:${minutes} ${ampm}`;
}

export function formatTimestampToDate(timestamp: Timestamp): Date {
    const date = timestamp.toDate();
    return date;
}
