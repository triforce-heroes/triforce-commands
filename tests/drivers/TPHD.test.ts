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

    expect(TPHD.parseRaw("Hello \u001A\u0004\u0000\u0001World!")).toStrictEqual(
      new Entries([
        new EntryText("Hello "),
        new EntryCommand("\u001A\u0004\u0000\u0001"),
        new EntryText("World!"),
      ]),
    );
  });

  it("test definition()", () => {
    expect(
      TPHD.define(new EntryCommand("\u001A\u0004\u0000\u0001")),
    ).toStrictEqual(
      new EntryCommandDefined("\u001A\u0004\u0000\u0001", {
        type: 4,
        subtype: 256,
        attributes: [],
      }),
    );
  });
});
