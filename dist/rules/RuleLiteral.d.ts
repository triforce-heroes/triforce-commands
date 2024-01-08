import { Rule } from "./Rule.js";
type Consume = number | ((input: string, offset: number) => string);
export declare class RuleLiteral extends Rule {
    readonly literal: string;
    readonly consume: Consume;
    constructor(literal: string, consume?: Consume);
}
export {};
