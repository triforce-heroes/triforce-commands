import { describe, expect, it } from "vitest";

import { ZTFH } from "../../src/drivers/ZTFH.js";
import { Entries } from "../../src/entries/Entries.js";
import { Entry } from "../../src/entries/Entry.js";
import { EntryCommand } from "../../src/entries/EntryCommand.js";
import { EntryText } from "../../src/entries/EntryText.js";

describe("driver ZTFH", () => {
  const tests: Array<[input: string, output: Entry[]]> = [
    ["Hello", [new EntryText("Hello")]],
    ["\uE001", [new EntryCommand("\uE001")]],
    ["\u000E\0\0ABC", [new EntryCommand("\u000E\0\0ABC")]],
    ["\u000E\0\u0002AB", [new EntryCommand("\u000E\0\u0002AB")]],
    ["\u000E\0\u0003AB", [new EntryCommand("\u000E\0\u0003AB")]],
    ["\u000E\u0001\0A", [new EntryCommand("\u000E\u0001\0A")]],
    ["\u000E\u0001\u0001AB", [new EntryCommand("\u000E\u0001\u0001AB")]],
    ["\u000E\u0001\u0002ABC", [new EntryCommand("\u000E\u0001\u0002ABC")]],
    ["\u000E\u0001\u0003ABCD", [new EntryCommand("\u000E\u0001\u0003ABCD")]],
    ["\u000E\u0001\u0004AB", [new EntryCommand("\u000E\u0001\u0004AB")]],
    ["\u000E\u0001\u0005AB", [new EntryCommand("\u000E\u0001\u0005AB")]],
    ["\u000E\u0002\0A", [new EntryCommand("\u000E\u0002\0A")]],
    ["\u000E\u0002\u0001A", [new EntryCommand("\u000E\u0002\u0001A")]],
    ["\u000E\u0002\u0002AB", [new EntryCommand("\u000E\u0002\u0002AB")]],
    ["\u000E\u0002\u0003AB", [new EntryCommand("\u000E\u0002\u0003AB")]],
    ["\u000E\u0002\u0004AB", [new EntryCommand("\u000E\u0002\u0004AB")]],
    ["\u000E\u0002\u0005A", [new EntryCommand("\u000E\u0002\u0005A")]],
    ["\u000E\u0002\u0006A", [new EntryCommand("\u000E\u0002\u0006A")]],
    ["\u000E\u0002\u0007A", [new EntryCommand("\u000E\u0002\u0007A")]],
    ["\u000E\u0002\u0008AB", [new EntryCommand("\u000E\u0002\u0008AB")]],
    [
      "\u000E\u0001\0A\uE001",
      [new EntryCommand("\u000E\u0001\0A"), new EntryCommand("\uE001")],
    ],
    [
      "\uE001\u000E\u0001\0AHello\uE001\u000E\u0001\0B",
      [
        new EntryCommand("\uE001"),
        new EntryCommand("\u000E\u0001\0A"),
        new EntryText("Hello"),
        new EntryCommand("\uE001"),
        new EntryCommand("\u000E\u0001\0B"),
      ],
    ],
  ];

  it.each(tests)("test %j", (input, output) => {
    expect(ZTFH.parse(input)).toStrictEqual(new Entries(output));
  });
});
