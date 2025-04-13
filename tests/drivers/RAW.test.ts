import { describe, expect, it } from "vitest";

import { RAW } from "@/drivers/RAW.js";
import { Entries } from "@/entries/Entries.js";
import { EntryText } from "@/entries/EntryText.js";

describe("driver RAW", () => {
  it("test", () => {
    expect(RAW.name).toBe("RAW");

    expect(RAW.parseRaw("Hello World!")).toStrictEqual(
      new Entries([new EntryText("Hello World!")]),
    );

    expect(RAW.parseRaw("Hello\0World!")).toStrictEqual(
      new Entries([new EntryText("Hello\0World!")]),
    );
  });
});
