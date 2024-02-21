#!/usr/bin/env node
import { program } from "commander";

import { ExtractCommand } from "./commands/ExtractCommand.js";

program
  .command("extract-commands")
  .description("extract all commands based on publishable.json")
  .argument("<engine driver>", 'engine driver to be used (eg. "ZTFH")')
  .action(ExtractCommand);

program.parse();
