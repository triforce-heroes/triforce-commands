import { CommandsBuilder } from "@/CommandsBuilder.js";
import { Entries } from "@/entries/Entries.js";
import { EntryCommand } from "@/entries/EntryCommand.js";
import { EntryCommandUnknown } from "@/entries/EntryCommandUnknown.js";
import { EntryText } from "@/entries/EntryText.js";
import type { Rule } from "@/rules/Rule.js";
import { RuleExpression } from "@/rules/RuleExpression.js";
import { RuleFailureExpression } from "@/rules/RuleFailureExpression.js";
import { RuleFailureLiteral } from "@/rules/RuleFailureLiteral.js";
import { RuleLiteral } from "@/rules/RuleLiteral.js";

export class CommandsMatcher {
  private readonly rules: Rule[] = [];

  public constructor(
    private readonly test?: (input: string) => boolean,
    private readonly advancer?: (input: string, offset: number) => number,
  ) {}

  public addExpression(...args: ConstructorParameters<typeof RuleExpression>) {
    this.rules.push(new RuleExpression(...args));
  }

  public addLiteral(...args: ConstructorParameters<typeof RuleLiteral>) {
    this.rules.push(new RuleLiteral(...args));
  }

  public addFailureLiteral(
    ...args: ConstructorParameters<typeof RuleFailureLiteral>
  ) {
    this.rules.push(new RuleFailureLiteral(...args));
  }

  public addFailureExpression(
    ...args: ConstructorParameters<typeof RuleFailureExpression>
  ) {
    this.rules.push(new RuleFailureExpression(...args));
  }

  public match(input: string) {
    if (this.test?.(input) === false) {
      return new Entries([new EntryText(input)]);
    }

    const builder = new CommandsBuilder(input, this.advancer);

    loop: while (builder.offset < input.length) {
      for (const rule of this.rules) {
        if (rule instanceof RuleLiteral) {
          if (input.startsWith(rule.literal, builder.offset)) {
            const consumeLength =
              typeof rule.consume === "function"
                ? rule.consume(input, builder.offset).length
                : rule.literal.length + rule.consume;

            builder.push(
              new EntryCommand(
                input.slice(builder.offset, builder.offset + consumeLength),
              ),
            );

            continue loop;
          }
        } else if (rule instanceof RuleExpression) {
          rule.expression.lastIndex = builder.offset;

          const match = rule.expression.exec(input);

          if (match) {
            const consumerLength = rule.consumeCallback
              ? rule.consumeCallback(match)
              : 0;

            builder.push(
              new EntryCommand(
                input.slice(
                  builder.offset,
                  builder.offset + match[0].length + consumerLength,
                ),
              ),
            );

            continue loop;
          }
        } else if (
          rule instanceof RuleFailureLiteral &&
          input.startsWith(rule.condition, builder.offset)
        ) {
          builder.push(new EntryCommandUnknown(input.slice(builder.offset)));

          continue loop;
        } else if (rule instanceof RuleFailureExpression) {
          rule.expression.lastIndex = builder.offset;

          const match = rule.expression.exec(input);

          if (match) {
            builder.push(new EntryCommandUnknown(input.slice(builder.offset)));

            continue loop;
          }
        }
      }

      builder.advance();
    }

    return builder.entries;
  }
}
