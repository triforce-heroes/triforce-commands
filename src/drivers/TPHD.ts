/* eslint-disable no-control-regex */
import { BufferConsumer } from "@triforce-heroes/triforce-core/BufferConsumer";

import { CommandsMatcher } from "../CommandsMatcher.js";
import { Driver } from "../Driver.js";
import { EntryCommandDefined } from "../entries/EntryCommandDefined.js";

const matcher = new CommandsMatcher();

matcher.addLiteral("\u001A", (input, offset) => {
  const consumeLength = input.codePointAt(offset + 1)!;

  return input.slice(offset, offset + consumeLength);
});

matcher.addLiteral("%d");
matcher.addLiteral("->");

matcher.addLiteral("\u0084");
matcher.addLiteral("\u008C");
matcher.addLiteral("\u0093");
matcher.addLiteral("\u009C");
matcher.addLiteral("\u0096");
matcher.addLiteral("\u00A0");

matcher.addFailureExpression(/[^-\p{L}\d\n !?'"&()*+,.%/:;=~¡¿©«»_°×]/u);

interface Attributes extends Record<string, unknown> {
  type: number;
  subtype: number;
  attributes: number[];
}

export const TPHD = new Driver(
  "TPHD",
  (input) => matcher.match(input),
  (input) => {
    if (!input.startsWith("\u001A")) {
      return new EntryCommandDefined(input, {
        type: 0,
        subtype: 0,
        attributes: [...input].map((c) => c.codePointAt(0)!),
      } as Attributes);
    }

    const consumer = new BufferConsumer(Buffer.from(input, "binary"), 1);

    return new EntryCommandDefined(input, {
      type: consumer.readUnsignedInt8(),
      subtype: consumer.readUnsignedInt16(),
      attributes: [...consumer.rest()],
    } as Attributes);
  },
);
