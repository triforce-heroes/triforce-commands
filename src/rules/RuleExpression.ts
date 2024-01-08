import { Rule } from "./Rule.js";

export class RuleExpression extends Rule {
  public readonly expression: RegExp;

  public constructor(expression: RegExp) {
    super();

    this.expression = new RegExp(expression, `${expression.flags}sy`);
  }
}
