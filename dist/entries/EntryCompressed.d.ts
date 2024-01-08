import { Entry } from "./Entry.js";
export declare class EntryCompressed extends Entry {
    readonly index: number;
    readonly contents: string;
    constructor(index: number, contents: string);
    get length(): number;
    toString(): string;
}
