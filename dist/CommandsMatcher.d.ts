import { Entries } from "./entries/Entries.js";
import { RuleExpression } from "./rules/RuleExpression.js";
import { RuleFailureExpression } from "./rules/RuleFailureExpression.js";
import { RuleFailureLiteral } from "./rules/RuleFailureLiteral.js";
import { RuleLiteral } from "./rules/RuleLiteral.js";
export declare class CommandsMatcher {
    private readonly test?;
    private readonly advancer?;
    private readonly rules;
    constructor(test?: ((input: string) => boolean) | undefined, advancer?: ((input: string, offset: number) => number) | undefined);
    addExpression(...args: ConstructorParameters<typeof RuleExpression>): void;
    addLiteral(...args: ConstructorParameters<typeof RuleLiteral>): void;
    addFailureLiteral(...args: ConstructorParameters<typeof RuleFailureLiteral>): void;
    addFailureExpression(...args: ConstructorParameters<typeof RuleFailureExpression>): void;
    match(input: string): Entries;
}
