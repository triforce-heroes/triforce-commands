import { Rule } from "./Rule.js";

type Consume = number | ((input: string, offset: number) => string);

export class RuleLiteral extends Rule {
  public constructor(
    public readonly literal: string,
    public readonly consume: Consume = 0,
  ) {
    super();
  }
}
