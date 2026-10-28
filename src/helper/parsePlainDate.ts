import { Temporal } from "temporal-polyfill";

// parses "yyy-mm-dd"; returns null for nayhting that isn't a real date

export function parsePlainDate(value: string): Temporal.PlainDate | null {
    try {
        return Temporal.PlainDate.from(value);
    } catch (error) {
        if (error instanceof RangeError) return null;
        throw error;
    }
}