import { CommandsMatcher } from "@/CommandsMatcher.js";
import { Driver } from "@/Driver.js";

const matcher = new CommandsMatcher((input) => /[%[\\^]/.test(input));

matcher.addLiteral("%d");
matcher.addLiteral("%s");
matcher.addLiteral("%%");

matcher.addLiteral("^06");

matcher.addExpression(/\[es\](?:\d*_){8}/u);
matcher.addExpression(/\[ed\](?:[^_]*_){4}/u);

matcher.addExpression(/\^07~[^~]*~/u);
matcher.addExpression(/(?<!\\)\[[^\]]+\]/u);

matcher.addLiteral("\\[");
matcher.addLiteral("\\]");

export const HWAC = new Driver("HWAC", (input) => matcher.match(input));
