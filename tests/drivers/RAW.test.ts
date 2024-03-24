import { describe, expect, it } from "vitest";

import { RAW } from "../../src/drivers/RAW.js";
import { Entries } from "../../src/entries/Entries.js";
import { EntryText } from "../../src/entries/EntryText.js";

describe("driver RAW", () => {
  it("test", () => {
    expect(RAW.name, "RAW");

    expect(RAW.parseRaw("Hello World!")).toStrictEqual(
      new Entries([new EntryText("Hello World!")]),
    );

    expect(RAW.parseRaw("Hello\0World!")).toStrictEqual(
      new Entries([new EntryText("Hello\0World!")]),
    );
  });
});
