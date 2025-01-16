/* eslint-disable no-control-regex */
import { CommandsMatcher } from "../CommandsMatcher.js";
import { Driver } from "../Driver.js";

const matcher = new CommandsMatcher();

matcher.addLiteral("\\\\boss_clingpound");
matcher.addLiteral("\\a_button_32");
matcher.addLiteral("\\ALT");
matcher.addLiteral("\\diddy_head");
matcher.addLiteral("\\dpad_all_directions");
matcher.addLiteral("\\dpad_left_right");
matcher.addLiteral("\\gray_705dc39d");
matcher.addLiteral("\\gray_x_button_32");
matcher.addLiteral("\\home");
matcher.addLiteral("\\l_button_32");
matcher.addLiteral("\\lr_noanim_btn");
matcher.addLiteral("\\NUL");
matcher.addLiteral("\\pdkb_icon");
matcher.addLiteral("\\r_button_32");
matcher.addLiteral("\\start_button_32");
matcher.addLiteral("\\temple");
matcher.addLiteral("\\tstick_all_directions");
matcher.addLiteral("\\x_button_32");

matcher.addExpression(/\[[^\]]+\]/);
matcher.addExpression(/<[^>]+>/);
matcher.addExpression(/\$\d/);
matcher.addExpression(/\\[a-f0-9]{8}/);

export const UDK = new Driver("UDK", (input) => matcher.match(input));
