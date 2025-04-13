import { describe, expect, it } from "vitest";

import { TPHD } from "@/drivers/TPHD.js";
import { Entries } from "@/entries/Entries.js";
import { EntryCommand } from "@/entries/EntryCommand.js";
import { EntryCommandDefined } from "@/entries/EntryCommandDefined.js";
import { EntryText } from "@/entries/EntryText.js";

describe("driver TPHD", () => {
  it("test", () => {
    expect(TPHD.name).toBe("TPHD");

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

    expect(
      TPHD.parseRaw("Hello \u001A\u0007\u00FF\u0000\u0001\u0000PWorld!"),
    ).toStrictEqual(
      new Entries([
        new EntryText("Hello "),
        new EntryCommand("\u001A\u0007\u00FF\u0000\u0001\u0000P"),
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

    expect(
      TPHD.parse("\u001A\u0007\u00FF\u0000\u0001\u0000\u0050123").entries,
    ).toStrictEqual([
      new EntryCommandDefined("\u001A\u0007\u00FF\u0000\u0001\u0000P", {
        type: 7,
        subtype: 255,
        attributes: [1, 0, 80],
      }),
      new EntryText("123"),
    ]);
  });
});
