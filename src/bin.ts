#!/usr/bin/env node

import { program } from 'commander';
import { registerCommands } from './index.js';

program
  .name('orians')
  .description('Orians Framework CLI')
  .version('5.6.0');

registerCommands(program);

program.parse(process.argv);