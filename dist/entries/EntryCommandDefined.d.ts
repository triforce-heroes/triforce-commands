import { EntryCommand } from "./EntryCommand.js";
export declare class EntryCommandDefined extends EntryCommand {
    attributes?: Record<string, unknown> | undefined;
    constructor(command: string, attributes?: Record<string, unknown> | undefined);
}
