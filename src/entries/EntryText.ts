import { Entry } from "@/entries/Entry.js";

export class EntryText extends Entry {
  public constructor(public readonly text: string) {
    super();
  }

  public get length(): number {
    return this.text.length;
  }

  public toString(): string {
    return this.text;
  }
}
