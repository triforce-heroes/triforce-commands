import { describe, expect, it } from "vitest";

import { UDK } from "../../src/drivers/UDK.js";
import { Entries } from "../../src/entries/Entries.js";
import { EntryText } from "../../src/entries/EntryText.js";

describe("driver UDK", () => {
  it("test", () => {
    expect(UDK.name).toBe("UDK");

    expect(UDK.parseRaw("Hello World!")).toStrictEqual(
      new Entries([new EntryText("Hello World!")]),
    );

    expect(UDK.parseRaw("Hello\0World!")).toStrictEqual(
      new Entries([new EntryText("Hello\0World!")]),
    );
  });
});
