import { Entry } from "./Entry.js";
export declare class Entries {
    readonly entries: Entry[];
    constructor(entries: Entry[]);
    toText(): string;
    toCompressed(slim?: boolean): Entries;
    toIndex(): string;
    toRaw(): string;
    fromCompressed(compressed: string, entries?: Entries): string;
}
