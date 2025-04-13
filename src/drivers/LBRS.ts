import { CommandsMatcher } from "@/CommandsMatcher.js";
import { Driver } from "@/Driver.js";

const matcher = new CommandsMatcher();

matcher.addExpression(/\{\d+\}/);

export const LBRS = new Driver("LBRS", (input) => matcher.match(input));
