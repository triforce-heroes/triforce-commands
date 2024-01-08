import { Entries } from "./entries/Entries.js";
export declare class Driver {
    readonly name: string;
    readonly parse: (input: string) => Entries;
    constructor(name: string, parse: (input: string) => Entries);
}
