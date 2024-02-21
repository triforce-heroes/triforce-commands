import { existsSync, readFileSync, writeFileSync } from "node:fs";

import { fatal } from "@triforce-heroes/triforce-core/Console";

import { loadEngineDriver } from "../drivers/index.js";
import { EntryCommand } from "../index.js";

interface Publishable {
  sources: Record<string, string>;
}

export function ExtractCommand(engineDriver: string) {
  const engineDriverInstance = loadEngineDriver(engineDriver);

  if (engineDriverInstance === undefined) {
    fatal(`Unsupported engine driver: ${engineDriver}`);
  }

  if (!existsSync("./publishable.json")) {
    fatal("publishable.json not found");
  }

  process.stdout.write("Extracting commands... ");

  const commands = new Set<string>();

  const publishables = JSON.parse(
    readFileSync("./publishable.json", "utf8"),
  ) as Publishable[];

  for (const publishable of publishables) {
    for (const source of Object.values(publishable.sources)) {
      const entries = engineDriverInstance.parseRaw(source);

      for (const entry of entries.entries) {
        if (entry instanceof EntryCommand) {
          commands.add(entry.command);
        }
      }
    }
  }

  writeFileSync(
    "./commands.json",
    JSON.stringify([...commands].sort(), null, 2),
  );

  process.stdout.write("DONE");
}
