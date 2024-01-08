import { Entry } from "./Entry.js";

export class EntryCommand extends Entry {
  public constructor(public readonly command: string) {
    super();
  }

  public get length(): number {
    return this.command.length;
  }

  public toString(): string {
    return this.command;
  }
}
