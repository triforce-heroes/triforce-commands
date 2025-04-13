/* eslint-disable no-control-regex */
import { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";

import { CommandsMatcher } from "@/CommandsMatcher.js";
import { Driver } from "@/Driver.js";
import { EntryCommandDefined } from "@/entries/EntryCommandDefined.js";

const buttonExpression = /[\ue000-\uefff]/;
const advanceExpression = /[\x0e\x0f\u{e000}-\u{efff}]/u;

const matcher = new CommandsMatcher(
  (input) => advanceExpression.test(input),
  (input, offset) => {
    const result = advanceExpression.exec(input.slice(offset));

    return result === null ? -1 : result.index + offset;
  },
);

matcher.addExpression(buttonExpression);
matcher.addExpression(
  /\x0e..(?<length>.)/u,
  (matches) => matches.groups!["length"]!.codePointAt(0)! / 2,
);
matcher.addExpression(/\x0f\x01\x10/u);
matcher.addExpression(/\x0f\x02\x02/u);
matcher.addExpression(/\x0f\x02\0/u);

matcher.addFailureLiteral("\u000E");
matcher.addFailureLiteral("\u000F");

interface Attributes extends Record<string, unknown> {
  type: number;
  subtype: number;
  attributes: number[];
}

export const ZTFH = new Driver(
  "ZTFH",
  (input) => matcher.match(input),
  (input) => {
    if (input.length === 1) {
      return new EntryCommandDefined(input, {
        type: 0xff_ff_00,
        subtype: 0,
        attributes: [input.codePointAt(0)],
      } as Attributes);
    }

    if (input.startsWith("\u000F")) {
      return new EntryCommandDefined(input, {
        type: 0xff_ff_0f,
        subtype: 0,
        attributes: [input.codePointAt(1), input.codePointAt(2)],
      } as Attributes);
    }

    const consumer = new BufferConsumer(Buffer.from(input), 1);

    const type = consumer.readUnsignedInt8();
    const subtype = consumer.readUnsignedInt8();
    const attributes: number[] = [];
    const attributesBuffer = Buffer.from(input.slice(4), "utf16le");

    for (
      let attributeIndex = 0;
      attributeIndex < attributesBuffer.length;
      attributeIndex += 2
    ) {
      attributes.push(attributesBuffer.readUInt16LE(attributeIndex));
    }

    return new EntryCommandDefined(input, {
      type,
      subtype,
      attributes,
    } as Attributes);
  },
);
