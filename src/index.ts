
import type { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { moduleCommand } from './commands/module.js';
import { buildCommand } from './commands/build.js';
import { syncCommand } from './commands/sync.js';
import { manifestCommand } from './commands/manifest.js';
import { resourceCommand } from './commands/resource.js';

export function registerCommands(program: Command): void {
  initCommand(program);
  moduleCommand(program);
  buildCommand(program);
  syncCommand(program);
  manifestCommand(program);
  resourceCommand(program);
}
