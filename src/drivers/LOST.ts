import { CommandsMatcher } from "@/CommandsMatcher.js";
import { Driver } from "@/Driver.js";

const matcher = new CommandsMatcher();

matcher.addLiteral("帱");
matcher.addLiteral("帲");
matcher.addLiteral("幣");
matcher.addExpression(/幮./);
matcher.addLiteral("\ue001");

export const LOST = new Driver("LOST", (input) => matcher.match(input));
