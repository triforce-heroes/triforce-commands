import { describe, expect, it } from "vitest";

import { TPHD } from "../../src/drivers/TPHD.js";
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

  const sampleCompressed = sampleEntries.toCompressed();

  it("method toText()", () => {
    expect(sampleEntries.toText()).toBe(" Hello <1><2><2><2><3><4><5>\n! ");
  });

  it("method toRaw()", () => {
    expect(sampleEntries.toRaw()).toBe(" Hello Wooorld\n! ");
  });

  it("method toCompressed()", () => {
    expect(sampleCompressed).toStrictEqual(
      new Entries([
        new EntryCompressed(1, " "),
        new EntryText("Hello"),
        new EntryCompressed(2, " <1><2><2><2><3><4><5>\n"),
        new EntryText("!"),
        new EntryCompressed(1, " "),
      ]),
    );

    expect(sampleCompressed.entries[2]!).toHaveLength(23);
    expect(sampleCompressed.toText()).toBe("<1>Hello<2>!<1>");
  });

  const toIndexSamples = [
    [sampleEntries, "Hello <1> !"],
    [sampleCompressed, "<1>Hello<2>!<1>"],
    [new Entries([new EntryText(" ")]), ""],
  ] as const;

  it.each(toIndexSamples)("method toIndex(%j)", (entries, output) => {
    expect(entries.toIndex()).toBe(output);
  });

  it("method fromCompressed()", () => {
    const sample = "< 0 >< 1 > Olá <2>\n!\n<1><6>";

    expect(sampleCompressed.fromCompressed(sample)).toBe(
      "<0> Olá <1><2><2><2><3><4><5>\n! <6>",
    );
    expect(sampleCompressed.fromCompressed(sample, sampleEntries)).toBe(
      "<0> Olá Wooorld\n! <6>",
    );

    expect(sampleCompressed.toRaw()).toBe(" Hello <1><2><2><2><3><4><5>\n! ");
  });
});

describe("class Entries", () => {
  it("method toCompress() over compress", () => {
    const sample = TPHD.parseRaw("Hello \u001A\u0002\n\u001A\u0003\u0000!");
    const sampleCompressed = sample.toCompressed();

    expect(sampleCompressed.toText()).toBe("Hello<1><2>!");
    expect(sampleCompressed.fromCompressed("Olá<1><2>!", sample)).toBe(
      "Olá \u001A\u0002\n\u001A\u0003\u0000!",
    );

    const sampleOverCompressed = sampleCompressed.toCompressed();

    expect(sampleOverCompressed.toText()).toBe("Hello<1>!");

    const sampleDecompressed = sampleOverCompressed.fromCompressed(
      "Olá<1>!",
      sampleCompressed,
    );

    expect(sampleDecompressed).toBe("Olá<1><2>!");
    expect(sampleCompressed.fromCompressed(sampleDecompressed, sample)).toBe(
      "Olá \u001A\u0002\n\u001A\u0003\u0000!",
    );
  });
});
