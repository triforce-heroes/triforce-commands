import { Entries } from "./entries/Entries.js";
import { Entry } from "./entries/Entry.js";
export declare class CommandsBuilder {
    private readonly input;
    private readonly advancer?;
    private readonly inEntries;
    private inOffset;
    private inAdvance;
    constructor(input: string, advancer?: ((input: string, offset: number) => number) | undefined);
    get entries(): Entries;
    get offset(): number;
    push(entry: Entry): void;
    advance(): void;
    private pushAdvanced;
}
