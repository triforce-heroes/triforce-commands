import { Entries } from "./entries/Entries.js";
import { EntryCommand } from "./entries/EntryCommand.js";
import { EntryCommandDefined } from "./entries/EntryCommandDefined.js";
export declare class Driver {
    readonly name: string;
    readonly parseRaw: (input: string) => Entries;
    readonly definer?: ((input: string) => EntryCommandDefined) | undefined;
    constructor(name: string, parseRaw: (input: string) => Entries, definer?: ((input: string) => EntryCommandDefined) | undefined);
    define(entry: EntryCommand): EntryCommandDefined;
    parse(input: string): Entries;
}
