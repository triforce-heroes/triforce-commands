import { describe, expect, it } from "vitest";

import { LBRS } from "@/drivers/LBRS.js";
import { Entries } from "@/entries/Entries.js";
import { EntryText } from "@/entries/EntryText.js";

import { EntryCommand } from "@/index";

describe("driver LBRS", () => {
  it("test", () => {
    expect(LBRS.name).toBe("LBRS");

    expect(LBRS.parseRaw("Hello World!")).toStrictEqual(
      new Entries([new EntryText("Hello World!")]),
    );

    expect(LBRS.parseRaw("Hello {0}!")).toStrictEqual(
      new Entries([
        new EntryText("Hello "),
        new EntryCommand("{0}"),
        new EntryText("!"),
      ]),
    );
  });
});
