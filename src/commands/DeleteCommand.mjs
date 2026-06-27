import inquirer from 'inquirer';

import { CrudGenerator } from '../generators/CrudGenerator.mjs';
import { TableGenerator } from '../generators/TableGenerator.mjs';
import { InterfaceGenerator } from '../generators/InterfaceGenerator.mjs';
import { ProjectSelector } from '../core/ProjectSelector.mjs';

export class DeleteCommand {
    async run() {
        try {
            const project = await ProjectSelector.select();

            const { operation } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'operation',
                    message: 'Remove Generator',
                    choices: [
                        { name: 'CRUD Remove', value: 'crud' },
                        { name: 'Table Remove', value: 'table' },
                        { name: 'Interface Remove', value: 'interface' },
                    ],
                },
            ]);

            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'module',
                    message: 'Module Name:',
                    validate: value =>
                        value.trim().length > 0 || 'Module name is required',
                },
                {
                    type: 'input',
                    name: 'model',
                    message: 'Model:',
                    default: answers => answers.module,
                },
                {
                    type: 'input',
                    name: 'namespace',
                    message: 'Namespace:',
                    validate: value =>
                        value.trim().length > 0 || 'Namespace is required',
                },
                {
                    type: 'confirm',
                    name: 'force',
                    message: 'Are you sure you want to delete these generated files?',
                    default: false,
                },
            ]);

            if (!answers.force) {
                console.log('\n⚠ Deletion cancelled.\n');
                return;
            }

            const payload = {
                ...answers,
                project,
                operation,
            };

            switch (operation) {
                case 'crud':
                    await new CrudGenerator(payload).delete();
                    break;

                case 'table':
                    await new TableGenerator(payload).delete();
                    break;

                case 'interface':
                    await new InterfaceGenerator(payload).delete();
                    break;

                default:
                    throw new Error(`Unknown generator: ${operation}`);
            }

            console.log('\n🗑️ Deletion completed successfully.\n');
        } catch (error) {
            console.error('\n❌ Error\n');
            console.error(error.message);
        }
    }
}