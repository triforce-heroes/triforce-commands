/* eslint-disable vitest/max-expects */
import { describe, expect, it } from "vitest";

import { PKLA } from "@/drivers/PKLA.js";
import { Entries } from "@/entries/Entries.js";
import { EntryText } from "@/entries/EntryText.js";
import { EntryCommand } from "@/index.js";

describe("driver PKLA", () => {
  it("test", () => {
    expect(PKLA.name).toBe("PKLA");

    expect(PKLA.parseRaw("Hello World!")).toStrictEqual(
      new Entries([new EntryText("Hello World!")]),
    );

    expect(
      PKLA.parseRaw("Hello \u0010\u0003\u1100\u00FF\u0403BoyGirl!"),
    ).toStrictEqual(
      new Entries([
        new EntryText("Hello "),
        new EntryCommand("\u0010\u0003\u1100\u00FF\u0403BoyGirl"),
        new EntryText("!"),
      ]),
    );

    expect(PKLA.parseRaw("Hello \u0010\u0002AB!")).toStrictEqual(
      new Entries([
        new EntryText("Hello "),
        new EntryCommand("\u0010\u0002AB"),
        new EntryText("!"),
      ]),
    );

    expect(PKLA.parseRaw("Hello \uE31F!")).toStrictEqual(
      new Entries([
        new EntryText("Hello "),
        new EntryCommand("\uE31F"),
        new EntryText("!"),
      ]),
    );

    expect(PKLA.parseRaw("Hello _WORLD!")).toStrictEqual(
      new Entries([
        new EntryText("Hello "),
        new EntryCommand("_WORLD"),
        new EntryText("!"),
      ]),
    );

    expect(PKLA.parseRaw("Hello [World]!")).toStrictEqual(
      new Entries([
        new EntryText("Hello "),
        new EntryCommand("[World]"),
        new EntryText("!"),
      ]),
    );
  });
});
