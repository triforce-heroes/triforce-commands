import { Entries } from "./entries/Entries.js";

export class Driver {
  public constructor(
    public readonly name: string,
    public readonly parse: (input: string) => Entries,
  ) {}
}
