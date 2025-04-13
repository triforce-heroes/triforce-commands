import { describe, expect, it } from "vitest";

import { HWAC } from "@/drivers/HWAC.js";
import { Entries, EntryCommand, EntryText } from "@/index.js";

describe("driver HWAC", () => {
  it("test", () => {
    expect(HWAC.name).toBe("HWAC");

    expect(
      HWAC.parseRaw(
        "[es]1_2_3_4_5_6_78_910_Hello %d%% ^06XYZ^07~ABC~^06^07~~ [World]!",
      ),
    ).toStrictEqual(
      new Entries([
        new EntryCommand("[es]1_2_3_4_5_6_78_910_"),
        new EntryText("Hello "),
        new EntryCommand("%d"),
        new EntryCommand("%%"),
        new EntryText(" "),
        new EntryCommand("^06"),
        new EntryText("XYZ"),
        new EntryCommand("^07~ABC~"),
        new EntryCommand("^06"),
        new EntryCommand("^07~~"),
        new EntryText(" "),
        new EntryCommand("[World]"),
        new EntryText("!"),
      ]),
    );
  });
});
