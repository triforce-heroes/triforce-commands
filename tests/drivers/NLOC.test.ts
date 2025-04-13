import { describe, expect, it } from "vitest";

import { NLOC } from "@/drivers/NLOC.js";
import { Entries } from "@/entries/Entries.js";
import { EntryCommand } from "@/entries/EntryCommand.js";
import { EntryCommandDefined } from "@/entries/EntryCommandDefined.js";
import { EntryText } from "@/entries/EntryText.js";

describe("driver NLOC", () => {
  it("test", () => {
    expect(NLOC.name).toBe("NLOC");

    expect(NLOC.parseRaw("Hello {p}!")).toStrictEqual(
      new Entries([
        new EntryText("Hello "),
        new EntryCommand("{p}"),
        new EntryText("!"),
      ]),
    );

    expect(NLOC.parseRaw("Hello {clr:000000}{clr:pop}World!")).toStrictEqual(
      new Entries([
        new EntryText("Hello "),
        new EntryCommand("{clr:000000}"),
        new EntryCommand("{clr:pop}"),
        new EntryText("World!"),
      ]),
    );
  });

  it("test definition()", () => {
    expect(NLOC.define(new EntryCommand("ABC"))).toStrictEqual(
      new EntryCommandDefined("ABC"),
    );
  });
});
