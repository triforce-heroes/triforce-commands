import { Rule } from "./Rule.js";
export declare class RuleExpression extends Rule {
    readonly expression: RegExp;
    readonly consumeCallback: ((matches: RegExpExecArray) => number) | undefined;
    constructor(expression: RegExp, consumeCallback?: (matches: RegExpExecArray) => number);
}
