import { EntryCommand } from "@/entries/EntryCommand.js";

export class EntryCommandDefined extends EntryCommand {
  public constructor(
    command: string,
    public attributes?: Record<string, unknown>,
  ) {
    super(command);
  }
}
