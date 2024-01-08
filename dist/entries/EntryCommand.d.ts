import { Entry } from "./Entry.js";
export declare class EntryCommand extends Entry {
    readonly command: string;
    constructor(command: string);
    get length(): number;
    toString(): string;
}
