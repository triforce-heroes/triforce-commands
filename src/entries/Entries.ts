/* eslint-disable regexp/prefer-named-capture-group */
/* eslint-disable prefer-named-capture-group */
import type { Entry } from "@/entries/Entry.js";
import { EntryCommand } from "@/entries/EntryCommand.js";
import { EntryCompressed } from "@/entries/EntryCompressed.js";
import { EntryText } from "@/entries/EntryText.js";

interface Command {
  index: number;
  entry: Entry;
}

const COMMAND_REGEXP = /\s*<\s*(\d+)\s*>\s*/g;

const COMMAND_STRICT_REGEXP = /<(\d+)>/g;

const OPTIMIZER_REGEXP = /(\n+|\s{2,}|\p{So}|\s*(?:<\d+>)+\s*|^\s+|\s+$)/u;

const OPTIMIZER_SLIM_REGEXP = /(\p{So}|(?:<\d+>){2,}$)/u;

const MULTIPLE_COMMANDS_REGEXP = /(?:<\s*\d+\s*>)+/g;

const MULTIPLE_SPACES_REGEXP = /\s+/g;

const NON_INDEXABLE_REGEXP = /[^\s\p{L}\p{N}\p{Pc}\p{Pd}\p{Po}<>]+/gu;

export class Entries {
  public constructor(public readonly entries: Entry[]) {}

  public toText() {
    const commands = new Map<string, Command>();
    let result = "";

    for (const entry of this.entries) {
      if (entry instanceof EntryText) {
        result += entry.text;

        continue;
      }

      if (entry instanceof EntryCompressed) {
        result += `<${String(entry.index)}>`;

        continue;
      }

      if (!(entry instanceof EntryCommand)) {
        continue;
      }

      if (!commands.has(entry.command)) {
        commands.set(entry.command, {
          index: commands.size + 1,
          entry,
        });
      }

      result += `<${String(commands.get(entry.command)!.index)}>`;
    }

    return result;
  }

  public toCompressed(slim = false) {
    const commands = new Map<string, Command>();
    const entries: Entry[] = [];
    const splits = this.toText().split(
      slim ? OPTIMIZER_SLIM_REGEXP : OPTIMIZER_REGEXP,
    );

    for (let i = 0; i < splits.length; i += 2) {
      const text = splits[i]!;

      if (text !== "") {
        entries.push(new EntryText(text));
      }

      const command = splits[i + 1];

      if (command !== undefined) {
        if (!commands.has(command)) {
          commands.set(command, {
            index: commands.size + 1,
            entry: new EntryCompressed(commands.size + 1, command),
          });
        }

        entries.push(commands.get(command)!.entry);
      }
    }

    return new Entries(entries);
  }

  public toIndex() {
    const commands = new Map<string, Command>();

    return new Entries([new EntryText(this.toCompressed(true).toText())])
      .toText()
      .replaceAll(MULTIPLE_COMMANDS_REGEXP, (match) => {
        if (!commands.has(match)) {
          commands.set(match, {
            index: commands.size + 1,
            entry: new EntryCompressed(commands.size + 1, match),
          });
        }

        return `<${String(commands.get(match)!.index)}>`;
      })
      .replaceAll(NON_INDEXABLE_REGEXP, " ")
      .replaceAll(MULTIPLE_SPACES_REGEXP, " ")
      .trim();
  }

  public toRaw() {
    return this.entries.map((entry) => entry.toString()).join("");
  }

  public fromCompressed(compressed: string, entries?: Entries) {
    const compressedCommands = new Map<number, EntryCompressed>();

    for (const entry of this.entries) {
      if (entry instanceof EntryCompressed) {
        compressedCommands.set(entry.index, entry);
      }
    }

    const decompressed = compressed.replaceAll(COMMAND_REGEXP, (_, index) => {
      const command = compressedCommands.get(Number(index));

      return command === undefined ? `<${String(index)}>` : command.contents;
    });

    if (entries === undefined) {
      return decompressed;
    }

    const entriesCommands = new Set<string>();

    for (const entry of entries.entries) {
      if (entry instanceof EntryCommand) {
        entriesCommands.add(entry.command);
      }
    }

    const entriesCommandsValues = [...entriesCommands.values()];

    return decompressed.replaceAll(
      COMMAND_STRICT_REGEXP,
      (_, index) => entriesCommandsValues[index - 1] ?? `<${String(index)}>`,
    );
  }
}
