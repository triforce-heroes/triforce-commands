import { Entry } from "./Entry.js";
export declare class EntryText extends Entry {
    readonly text: string;
    constructor(text: string);
    get length(): number;
    toString(): string;
}
