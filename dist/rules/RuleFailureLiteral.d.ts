import { Rule } from "./Rule.js";
export declare class RuleFailureLiteral extends Rule {
    readonly condition: string;
    constructor(condition: string);
}
