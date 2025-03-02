export async function wait(ms: number) {
    return new Promise<void>(resolve => {
        setTimeout(() => {
            resolve();
        }, Math.max(0, ms))
    });
}

export function shorten(str: string, maxLength: number) {
    const max = Math.max(4, maxLength);

    if (str.length >= max) {
        return str.substring(0, max - 3) + "...";
    }
    return str;
}

export function parseArray(json: string) {
    try {
        return JSON.parse(json);
    }
    catch {
        return [];
    }
}

export function parseBoolean(str: string) {
    if (str.toLowerCase() === "true")
        return true;
    return false;
}

export function toIsoCoord(num: number): string {
    return `${num >= 0 ? "%2B" : ""}${num}`;
}

export function offsetTime(offset: number) {
    const date = new Date();
    date.setSeconds(date.getSeconds() + offset);
    return date;
}

export function toShortTime(date: Date): string {
    return `${date.getHours()}:${String(date.getSeconds()).padStart(2, "0")}`;
}

const weekDays = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
];
const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]

export function toShortDate(date: Date): string {
    return `${weekDays[date.getDay()]} ${String(date.getDate()).padStart(2, "0")} ${months[date.getMonth()]}`
}