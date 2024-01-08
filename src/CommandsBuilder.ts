import { Entries } from "./entries/Entries.js";
import { Entry } from "./entries/Entry.js";
import { EntryText } from "./entries/EntryText.js";

export class CommandsBuilder {
  private readonly inEntries: Entry[] = [];

  private inOffset = 0;

  private inAdvance = 0;

  public constructor(
    private readonly input: string,
    private readonly advancer?: (input: string, offset: number) => number,
  ) {}

  public get entries() {
    this.pushAdvanced();

    return new Entries(this.inEntries);
  }

  public get offset() {
    return this.inOffset + this.inAdvance;
  }

  public push(entry: Entry) {
    this.pushAdvanced();

    this.inEntries.push(entry);
    this.inOffset += entry.length;
  }

  public advance() {
    if (this.advancer === undefined) {
      this.inAdvance++;

      return;
    }

    const advance = this.advancer(this.input, this.offset);

    this.inAdvance =
      advance === -1 ? this.input.length - this.offset : advance - this.offset;
  }

  private pushAdvanced() {
    if (this.inAdvance === 0) {
      return;
    }

    const text = this.input.slice(this.inOffset, this.offset);

    this.inAdvance = 0;
    this.push(new EntryText(text));
  }
}
