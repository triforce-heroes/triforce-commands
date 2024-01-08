import { Rule } from "./Rule.js";
export declare class RuleFailureExpression extends Rule {
    readonly expression: RegExp;
    constructor(expression: RegExp);
}
