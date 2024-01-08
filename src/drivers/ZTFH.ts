/* eslint-disable no-control-regex */
import { CommandsMatcher } from "../CommandsMatcher.js";
import { Driver } from "../Driver.js";

const buttonExpression = /[\uE000-\uE0FF]/;
const advanceExpression = /[\u000E\uE000-\uE0FF]/u;

const matcher = new CommandsMatcher(
  (input) => input.includes("\u000E") || buttonExpression.test(input),
  (input, offset) => {
    const result = advanceExpression.exec(input.slice(offset));

    return result === null ? -1 : result.index + offset;
  },
);

matcher.addExpression(buttonExpression);
matcher.addExpression(/\u000E\0\0.../);
matcher.addExpression(/\u000E\0[\u0002\u0003]../);
matcher.addExpression(/\u000E\u0001\0./);
matcher.addExpression(/\u000E\u0001[\u0001\u0004\u0005]../);
matcher.addExpression(/\u000E\u0001\u0002.../);
matcher.addExpression(/\u000E\u0001\u0003..../);
matcher.addExpression(/\u000E\u0002[\0\u0001\u0005\u0006\u0007]./);
matcher.addExpression(/\u000E\u0002[\u0002\u0003\u0004\u0008]../);

matcher.addFailureLiteral("\u000E");

export const ZTFH = new Driver("ZTFH", (input) => matcher.match(input));
