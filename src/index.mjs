#!/usr/bin/env node

import { DeleteCommand } from './commands/DeleteCommand.mjs';
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

    case 'delete':
        await new DeleteCommand().run();
        break;

    default:
        console.log(`Usage:\n os init\n os make\n os delete`);
}
