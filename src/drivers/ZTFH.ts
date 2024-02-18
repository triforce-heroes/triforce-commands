/* eslint-disable no-control-regex */
import { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";

import { CommandsMatcher } from "../CommandsMatcher.js";
import { Driver } from "../Driver.js";
import { EntryCommandDefined } from "../entries/EntryCommandDefined.js";

const buttonExpression = /[\uE000-\uEFFF]/;
const advanceExpression = /[\u000E\uE000-\uEFFF]/u;

const matcher = new CommandsMatcher(
  (input) => advanceExpression.test(input),
  (input, offset) => {
    const result = advanceExpression.exec(input.slice(offset));

    return result === null ? -1 : result.index + offset;
  },
);

matcher.addExpression(buttonExpression);
matcher.addExpression(
  /\u000E..(.)/u,
  (matches) => matches[1]!.codePointAt(0)! / 2,
);

matcher.addFailureLiteral("\u000E");

export const ZTFH = new Driver(
  "ZTFH",
  (input) => matcher.match(input),
  (input) => {
    if (input.length === 1) {
      return new EntryCommandDefined(input, {
        type: "button",
        subtype: input,
      });
    }

    const consumer = new BufferConsumer(Buffer.from(input, "binary"), 1);

    const type = consumer.readUnsignedInt8();
    const subtype = consumer.readUnsignedInt8();
    const attributes = consumer.readLengthPrefixedString(1);

    return new EntryCommandDefined(input, {
      type,
      subtype,
      attributes,
    });
  },
);
