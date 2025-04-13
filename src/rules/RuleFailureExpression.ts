import { Rule } from "@/rules/Rule.js";

export class RuleFailureExpression extends Rule {
  public readonly expression: RegExp;

  public constructor(expression: RegExp) {
    super();

    this.expression = new RegExp(expression, `${expression.flags}sy`);
  }
}
