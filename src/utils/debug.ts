import { inspect } from "node:util";

import { Driver } from "../Driver.js";
import { EntryCommand } from "../entries/EntryCommand.js";
import { EntryCommandUnknown } from "../entries/EntryCommandUnknown.js";

export function debugEntries(
  driver: Driver,
  entries: string[],
  length: number,
) {
  const unknowns = new Set<string>();
  const knowns = new Set<string>();

  for (const entry of entries) {
    for (const command of driver.parseRaw(entry).entries) {
      if (command instanceof EntryCommandUnknown) {
        unknowns.add(command.command.slice(0, length));
      } else if (command instanceof EntryCommand) {
        knowns.add(command.command);
      }
    }
  }

  process.stdout.write(
    inspect(
      {
        unknowns: [...unknowns].sort(),
        knowns: [...knowns].sort(),
      },
      {
        depth: null,
        colors: true,
        maxArrayLength: null,
      },
    ),
  );
}
