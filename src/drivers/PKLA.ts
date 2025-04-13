/* eslint-disable no-control-regex */
import { CommandsMatcher } from "@/CommandsMatcher.js";
import { Driver } from "@/Driver.js";

const matcher = new CommandsMatcher();

matcher.addExpression(/\x10\x03\u1100\xff(?<length>.)/, (expressionMatcher) => {
  const lengthSum = expressionMatcher.groups!["length"]!.codePointAt(0)!;
  // eslint-disable-next-line no-bitwise
  const lengthLeft = lengthSum >> 8;
  // eslint-disable-next-line no-bitwise
  const lengthRight = lengthSum & 0xff;

  return lengthLeft + lengthRight;
});
matcher.addExpression(
  /\x10(?<length>.)/,
  (expressionMatcher) => expressionMatcher.groups!["length"]!.codePointAt(0)!,
);
matcher.addExpression(/_\w+/);
matcher.addExpression(/[\ue300-\ue31f]/);
matcher.addExpression(/\[[^\]]+\]/);

export const PKLA = new Driver("PKLA", (input) => matcher.match(input));
