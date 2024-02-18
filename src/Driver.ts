import { Entries } from "./entries/Entries.js";
import { EntryCommand } from "./entries/EntryCommand.js";
import { EntryCommandDefined } from "./entries/EntryCommandDefined.js";

export class Driver {
  public constructor(
    public readonly name: string,
    public readonly parseRaw: (input: string) => Entries,
    public readonly definer?: (input: string) => EntryCommandDefined,
  ) {}

  // eslint-disable-next-line class-methods-use-this
  public define(entry: EntryCommand): EntryCommandDefined {
    return (
      this.definer?.(entry.command) ?? new EntryCommandDefined(entry.command)
    );
  }

  public parse(input: string) {
    return new Entries(
      this.parseRaw(input).entries.map((entry) => {
        if (entry instanceof EntryCommand) {
          return this.define(entry);
        }

        return entry;
      }),
    );
  }
}
