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