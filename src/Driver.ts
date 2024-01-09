import { Entries } from "./entries/Entries.js";
import { EntryCommand } from "./entries/EntryCommand.js";
import { EntryDefinition } from "./entries/EntryDefinition.js";

export class Driver {
  public constructor(
    public readonly name: string,
    public readonly parse: (input: string) => Entries,
    public readonly definer?: (input: string) => EntryDefinition,
  ) {}

  // eslint-disable-next-line class-methods-use-this
  public define(entry: EntryCommand): EntryDefinition {
    return this.definer?.(entry.command) ?? new EntryDefinition(entry.command);
  }
}
