import { describe, expect, it } from "vitest";

import { TPHD } from "../../src/drivers/TPHD.js";
import { Entries } from "../../src/entries/Entries.js";
import { EntryCommand } from "../../src/entries/EntryCommand.js";
import { EntryCommandDefined } from "../../src/entries/EntryCommandDefined.js";
import { EntryText } from "../../src/entries/EntryText.js";

describe("driver TPHD", () => {
  it("test", () => {
    expect(TPHD.name, "TPHD");

    expect(TPHD.parseRaw("Hello \u001A\u0007World!")).toStrictEqual(
      new Entries([
        new EntryText("Hello "),
        new EntryCommand("\u001A\u0007World"),
        new EntryText("!"),
      ]),
    );

    expect(TPHD.parseRaw("Hello \u001A\u0002World!")).toStrictEqual(
      new Entries([
        new EntryText("Hello "),
        new EntryCommand("\u001A\u0002"),
        new EntryText("World!"),
      ]),
    );
  });

  it("test definition()", () => {
    expect(TPHD.define(new EntryCommand("ABC"))).toStrictEqual(
      new EntryCommandDefined("ABC"),
    );
  });
});
