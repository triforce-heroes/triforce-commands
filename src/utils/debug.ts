import { inspect } from "node:util";

import { Driver } from "../Driver.js";
import { EntryCommand } from "../entries/EntryCommand.js";
import { EntryCommandUnknown } from "../entries/EntryCommandUnknown.js";

type DebugMode = "Command" | "CommandUnknown";

export function debugEntries(
  driver: Driver,
  entries: string[],
  length: number,
  mode: DebugMode = "CommandUnknown",
) {
  const results = new Set<string>();

  for (const entry of entries) {
    for (const command of driver.parse(entry).entries) {
      const isCommand = mode === "Command" && command instanceof EntryCommand;
      const isCommandUnknown =
        mode === "CommandUnknown" && command instanceof EntryCommandUnknown;

      if (isCommand || isCommandUnknown) {
        results.add(command.command.slice(0, length));
      }
    }
  }

  process.stdout.write(
    inspect([...results].sort(), {
      depth: null,
      colors: true,
      maxArrayLength: null,
    }),
  );
}
