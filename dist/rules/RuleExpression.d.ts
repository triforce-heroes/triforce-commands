import { Rule } from "./Rule.js";
export declare class RuleExpression extends Rule {
    readonly expression: RegExp;
    constructor(expression: RegExp);
}
