import { Entry } from "@/entries/Entry.js";

export class EntryCompressed extends Entry {
  public constructor(
    public readonly index: number,
    public readonly contents: string,
  ) {
    super();
  }

  public get length(): number {
    return this.contents.length;
  }

  public toString(): string {
    return this.contents;
  }
}
