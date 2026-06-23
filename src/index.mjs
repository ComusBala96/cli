#!/usr/bin/env node

import { InitCommand } from './commands/InitCommand.mjs';
import { MakeCommand } from './commands/MakeCommand.mjs';

const command = process.argv[2];

switch (command) {
    case 'init':
        await new InitCommand().run();
        break;

    case 'make':
        await new MakeCommand().run();
        break;

    default:
        console.log(`
                    Usage:

                    os init
                    os make
                    `);
}
