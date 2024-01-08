/* eslint-disable no-control-regex */
import { CommandsMatcher } from "../CommandsMatcher.js";
import { Driver } from "../Driver.js";

const matcher = new CommandsMatcher(
  (input) => input.includes("\u001A"),
  (input, offset) => input.indexOf("\u001A", offset),
);

matcher.addLiteral("\u001A", (input, offset) => {
  const consumeLength = input.codePointAt(offset + 1)!;

  return input.slice(offset, offset + consumeLength);
});

export const TPHD = new Driver("TPHD", (input) => matcher.match(input));
