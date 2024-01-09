import { describe, expect, it } from "vitest";

import { CommandsMatcher } from "../src/CommandsMatcher.js";
import { Entries } from "../src/entries/Entries.js";
import { EntryCommand } from "../src/entries/EntryCommand.js";
import { EntryCommandUnknown } from "../src/entries/EntryCommandUnknown.js";
import { EntryText } from "../src/entries/EntryText.js";

describe("class CommandsMatcher", () => {
  it("method addLiteral()", () => {
    const matcher = new CommandsMatcher();

    matcher.addLiteral("B", 1);
    matcher.addLiteral("C", (input, offset) => input.slice(offset, offset + 2));

    expect(matcher.match("ABC")).toStrictEqual(
      new Entries([new EntryText("A"), new EntryCommand("BC")]),
    );
  });

  it("method addLiteral() with consumer", () => {
    expect.assertions(1);

    const matcher = new CommandsMatcher();

    matcher.addLiteral("D", (input, offset) => input.slice(offset, offset + 2));

    expect(matcher.match("ABCDEF")).toStrictEqual(
      new Entries([
        new EntryText("ABC"),
        new EntryCommand("DE"),
        new EntryText("F"),
      ]),
    );
  });

  it("method addLiteral() with test", () => {
    expect.assertions(1);

    const matcher = new CommandsMatcher((input) => input.includes("X"));

    matcher.addLiteral("D", () => {
      expect.fail();
    });

    // Must not fails, because tester will fail and will accept all instead.
    expect(matcher.match("ABCD")).toStrictEqual(
      new Entries([new EntryText("ABCD")]),
    );
  });

  it("method addLiteral() with advance", () => {
    const matcher = new CommandsMatcher(undefined, (input, offset) =>
      input.indexOf("D", offset),
    );

    matcher.addLiteral("D");

    // Must not fails, because tester will fail and will accept all instead.
    expect(matcher.match("ABCDEF")).toStrictEqual(
      new Entries([
        new EntryText("ABC"),
        new EntryCommand("D"),
        new EntryText("EF"),
      ]),
    );
  });

  it("method addExpression()", () => {
    const matcher = new CommandsMatcher();

    matcher.addExpression(/B/);

    expect(matcher.match("ABC")).toStrictEqual(
      new Entries([
        new EntryText("A"),
        new EntryCommand("B"),
        new EntryText("C"),
      ]),
    );
  });

  it("method addExpression() with consumer", () => {
    const matcher = new CommandsMatcher();

    matcher.addExpression(/B(.)/, (matches) => matches[1]!.codePointAt(0)!);

    expect(matcher.match("AB\u0000B\u0001CB\u0002CDE")).toStrictEqual(
      new Entries([
        new EntryText("A"),
        new EntryCommand("B\u0000"),
        new EntryCommand("B\u0001C"),
        new EntryCommand("B\u0002CD"),
        new EntryText("E"),
      ]),
    );
  });

  it("method addFailureLiteral()", () => {
    const matcher = new CommandsMatcher();

    matcher.addFailureLiteral("B");

    expect(matcher.match("ABC")).toStrictEqual(
      new Entries([new EntryText("A"), new EntryCommandUnknown("BC")]),
    );
  });

  it("method addFailureExpression()", () => {
    const matcher = new CommandsMatcher();

    matcher.addFailureExpression(/B/);

    expect(matcher.match("ABC")).toStrictEqual(
      new Entries([new EntryText("A"), new EntryCommandUnknown("BC")]),
    );
  });
});
