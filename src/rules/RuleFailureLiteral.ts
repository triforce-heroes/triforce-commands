import { Rule } from "./Rule.js";

export class RuleFailureLiteral extends Rule {
  public constructor(public readonly condition: string) {
    super();
  }
}
