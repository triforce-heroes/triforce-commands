import { Entry } from "./Entry.js";
export declare class Entries {
    readonly entries: Entry[];
    constructor(entries: Entry[]);
    toText(): string;
    toTranslation(slim?: boolean): Entries;
    toIndex(): string;
    toRaw(): string;
    fromTranslation(translation: string): string;
    private getCommandIndexes;
}
