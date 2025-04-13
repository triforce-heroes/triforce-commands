import { CommandsMatcher } from "@/CommandsMatcher.js";
import { Driver } from "@/Driver.js";

const matcher = new CommandsMatcher();

matcher.addExpression(/\{[^}]*\}/);
matcher.addExpression(/[※₢]/u);

export const NLOC = new Driver("NLOC", (input) => matcher.match(input));
