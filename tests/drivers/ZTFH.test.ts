import { describe, expect, it } from "vitest";

import { ZTFH } from "../../src/drivers/ZTFH.js";
import { Entries } from "../../src/entries/Entries.js";
import { Entry } from "../../src/entries/Entry.js";
import { EntryCommand } from "../../src/entries/EntryCommand.js";
import { EntryCommandDefined } from "../../src/entries/EntryCommandDefined.js";
import { EntryText } from "../../src/entries/EntryText.js";

describe("driver ZTFH", () => {
  const tests: Array<[input: string, output: Entry[]]> = [
    ["Hello", [new EntryText("Hello")]],
    ["\uE001", [new EntryCommand("\uE001")]],
    ["\u000E\0\0\0A", [new EntryCommand("\u000E\0\0\0"), new EntryText("A")]],
    [
      "\u000E\0\0\u0002ABC",
      [new EntryCommand("\u000E\0\0\u0002A"), new EntryText("BC")],
    ],
    [
      "\u000E\0\0\u0004ABC",
      [new EntryCommand("\u000E\0\0\u0004AB"), new EntryText("C")],
    ],
    ["\u000E\0\0\u0006ABC", [new EntryCommand("\u000E\0\0\u0006ABC")]],
    [
      "\u000E\u0000\u0000\u0012\0\0ABCDEFG+",
      [
        new EntryCommand("\u000E\u0000\u0000\u0012\0\0ABCDEFG"),
        new EntryText("+"),
      ],
    ],
    [
      "\u000E\u0003\u0007\u0000\uE090",
      [
        new EntryCommand("\u000E\u0003\u0007\u0000"),
        new EntryCommand("\uE090"),
      ],
    ],
    [
      "\u000E\u0002\u0002\n\b2023     \u000E\u0002\u0003\f\n00:00",
      [
        new EntryCommand("\u000E\u0002\u0002\n\b2023"),
        new EntryText("     "),
        new EntryCommand("\u000E\u0002\u0003\f\n00:00"),
      ],
    ],
    [
      "\u000E\u0002\u0002\u0002\n\nBreak Before",
      [
        new EntryCommand("\u000E\u0002\u0002\u0002\n"),
        new EntryText("\nBreak Before"),
      ],
    ],
    ["\u000E\u0001\0\0", [new EntryCommand("\u000E\u0001\0\0")]],
  ];

  it.each(tests)("test %j", (input, output) => {
    expect(ZTFH.parseRaw(input)).toStrictEqual(new Entries(output));
  });

  it("test toCompressed() and fromCompressed()", () => {
    const entrySource =
      "Hero.\n- \u000E\0\0\u0002+Hero\u000E\u0000\u0000\u0004++.";
    const entries = ZTFH.parseRaw(entrySource);

    const entriesCompressed = entries.toCompressed();
    const entriesText = entriesCompressed.toText();

    expect(entriesText).toBe("Hero.<1>-<2>Hero<3>.");
    expect(entriesCompressed.fromCompressed(entriesText, entries)).toBe(
      entrySource,
    );
  });

  const defineTests = [
    ["\u000E\0\0\u0006\u0002\u0002X", 0, 0, "\u0002\u0002X"],
    ["\u000E\0\u0002\u0002Z", 0, 2, "Z"],
    ["\u000E\0\u0003\u0002\u0000", 0, 3, "\u0000"],
    ["\u000E\0\u0003\u0002\uFFFF", 0, 3, "\uFFFD"],
    ["\u000E\u0001\u0000\u0000", 1, 0, ""],
    ["\uE0E9", "button", "\uE0E9"],
    ["\uE9E0", "button", "\uE9E0"],
    ["\uE100", "button", "\uE100"],
  ] as const;

  it.each(defineTests)(
    "test define(%j)",
    (input, type, subtype, attributes?) => {
      expect(ZTFH.define(new EntryCommand(input))).toStrictEqual(
        new EntryCommandDefined(input, {
          type,
          subtype,
          ...(attributes !== undefined && { attributes }),
        }),
      );
    },
  );
});
