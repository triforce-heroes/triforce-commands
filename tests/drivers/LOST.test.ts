import { describe, expect, it } from "vitest";

import { LOST } from "@/drivers/LOST.js";
import { Entries } from "@/entries/Entries.js";
import { EntryText } from "@/entries/EntryText.js";
import { EntryCommand } from "@/index.js";

describe("driver LOST", () => {
  it("test", () => {
    expect(LOST.name).toBe("LOST");

    expect(LOST.parseRaw("Hello World!")).toStrictEqual(
      new Entries([new EntryText("Hello World!")]),
    );

    expect(LOST.parseRaw("Hello 幮+ and \ue001!")).toStrictEqual(
      new Entries([
        new EntryText("Hello "),
        new EntryCommand("幮+"),
        new EntryText(" and "),
        new EntryCommand("\ue001"),
        new EntryText("!"),
      ]),
    );
  });
});
