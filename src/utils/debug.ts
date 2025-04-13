import type { Driver } from "@/Driver.js";
import { EntryCommand } from "@/entries/EntryCommand.js";
import { EntryCommandUnknown } from "@/entries/EntryCommandUnknown.js";

interface Sample {
  raw: string;
  commandsCounter: number;
}

export function debugEntries(
  driver: Driver,
  entries: string[],
  length: number,
  includeSamples = false,
) {
  const unknowns = new Set<string>();
  const knowns = new Map<string, string[]>();

  for (const entry of entries) {
    for (const command of driver.parseRaw(entry).entries) {
      if (command instanceof EntryCommandUnknown) {
        unknowns.add(command.command.slice(0, length));
      } else if (command instanceof EntryCommand) {
        if (!knowns.has(command.command)) {
          knowns.set(command.command, []);
        }

        knowns.get(command.command)!.push(entry);
      }
    }
  }

  const samples = new Map<string, string[]>();

  if (includeSamples) {
    for (const [knownCommand, knownsSamples] of knowns.entries()) {
      const knownSamples: Sample[] = [];

      for (const knownSample of knownsSamples) {
        knownSamples.push({
          raw: knownSample,
          commandsCounter: driver
            .parseRaw(knownSample)
            .entries.reduce(
              (count, command) =>
                count + Number(command instanceof EntryCommand),
              0,
            ),
        });
      }

      samples.set(
        knownCommand,
        knownSamples
          .sort(
            (sampleA, sampleB) =>
              sampleA.commandsCounter - sampleB.commandsCounter ||
              sampleA.raw.length - sampleB.raw.length,
          )
          .map(({ raw }) => raw)
          .slice(0, 10),
      );
    }
  }

  return {
    unknowns: [...unknowns].sort(),
    knowns: [...knowns.keys()].sort(),
    samples: [...samples.entries()].sort(([entryA], [entryB]) =>
      entryA.localeCompare(entryB),
    ),
  };
}
