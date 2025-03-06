/* eslint-disable no-control-regex */
import { CommandsMatcher } from "../CommandsMatcher.js";
import { Driver } from "../Driver.js";

const matcher = new CommandsMatcher();

matcher.addExpression(
  /\u0010\u0003\u1100\u00FF(?<length>.)/,
  (expressionMatcher) => {
    const lengthSum = expressionMatcher.groups!["length"]!.codePointAt(0)!;
    const lengthLeft = lengthSum >> 8;
    const lengthRight = lengthSum & 0xff;

    return lengthLeft + lengthRight;
  },
);
matcher.addExpression(
  /\u0010(?<length>.)/,
  (expressionMatcher) => expressionMatcher.groups!["length"]!.codePointAt(0)!,
);
matcher.addExpression(/_\w+/);
matcher.addExpression(/[\uE300-\uE31F]/);
matcher.addExpression(/\[[^\]]+\]/);

export const PKLA = new Driver("PKLA", (input) => matcher.match(input));
