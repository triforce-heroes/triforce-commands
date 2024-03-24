/* eslint-disable no-control-regex */
import { CommandsMatcher } from "../CommandsMatcher.js";
import { Driver } from "../Driver.js";

const matcher = new CommandsMatcher();

export const RAW = new Driver("RAW", (input) => matcher.match(input));
