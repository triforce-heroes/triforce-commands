import { Entries } from "./entries/Entries.js";
import { EntryCommand } from "./entries/EntryCommand.js";
import { EntryDefinition } from "./entries/EntryDefinition.js";
export declare class Driver {
    readonly name: string;
    readonly parse: (input: string) => Entries;
    readonly definer?: ((input: string) => EntryDefinition) | undefined;
    constructor(name: string, parse: (input: string) => Entries, definer?: ((input: string) => EntryDefinition) | undefined);
    define(entry: EntryCommand): EntryDefinition;
}
