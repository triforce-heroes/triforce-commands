import { Rule } from "@/rules/Rule.js";

export class RuleExpression extends Rule {
  public readonly expression;

  public readonly consumeCallback;

  public constructor(
    expression: RegExp,
    consumeCallback?: (matches: RegExpExecArray) => number,
  ) {
    super();

    this.expression = new RegExp(expression, `${expression.flags}sy`);
    this.consumeCallback = consumeCallback;
  }
}
