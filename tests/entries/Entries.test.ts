import { describe, expect, it } from "vitest";

import { Entries } from "../../src/entries/Entries.js";
import { EntryCommand } from "../../src/entries/EntryCommand.js";
import { EntryCompressed } from "../../src/entries/EntryCompressed.js";
import { EntryText } from "../../src/entries/EntryText.js";

describe("class Entries", () => {
  const sampleEntries = new Entries([
    new EntryText(" Hello "),
    new EntryCommand("W"),
    new EntryCommand("o"),
    new EntryCommand("o"),
    new EntryCommand("o"),
    new EntryCommand("r"),
    new EntryCommand("l"),
    new EntryCommand("d"),
    new EntryText("\n! "),
  ]);

  const sampleTranslation = sampleEntries.toTranslation();

  it("method toText()", () => {
    expect(sampleEntries.toText()).toBe(" Hello <1><2><2><2><3><4><5>\n! ");
  });

  it("method toRaw()", () => {
    expect(sampleEntries.toRaw()).toBe(" Hello Wooorld\n! ");
  });

  it("method toTranslation()", () => {
    expect(sampleTranslation).toStrictEqual(
      new Entries([
        new EntryCompressed(1, " "),
        new EntryText("Hello"),
        new EntryCompressed(2, " <1><2><2><2><3><4><5>\n"),
        new EntryText("!"),
        new EntryCompressed(1, " "),
      ]),
    );

    expect(sampleTranslation.entries[2]!).toHaveLength(23);
    expect(sampleTranslation.toText()).toBe("<1>Hello<2>!<1>");
  });

  it("method toIndex()", () => {
    expect(sampleEntries.toIndex()).toBe("Hello <1> !");
    expect(sampleTranslation.toIndex()).toBe("<1>Hello<2>!<1>");

    expect(new Entries([new EntryText(" ")]).toIndex()).toBe("");
  });

  it("method fromTranslation()", () => {
    expect(
      sampleTranslation.fromTranslation("< 0 >< 1 > Olá <2>\n!\n<1><3>"),
    ).toBe("<0> Olá <1><2><2><2><3><4><5>\n! <3>");
    expect(sampleTranslation.toRaw()).toBe(" Hello <1><2><2><2><3><4><5>\n! ");
  });
});
