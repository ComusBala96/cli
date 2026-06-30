import inquirer from 'inquirer';

import { CrudGenerator } from '../generators/CrudGenerator.mjs';
import { TableGenerator } from '../generators/TableGenerator.mjs';
import { InterfaceGenerator } from '../generators/InterfaceGenerator.mjs';
import { ProjectSelector } from '../core/ProjectSelector.mjs';

export class MakeCommand {
    async run() {
        try {
            const project = await ProjectSelector.select();

            const { operation } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'operation',
                    message: 'Select Generator',
                    choices: [
                        { name: 'CRUD Generator', value: 'crud' },
                        { name: 'Table Generator', value: 'table' },
                        { name: 'Interface Generator', value: 'interface' },
                    ],
                },
            ]);

            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'module',
                    message: 'Module Name:',
                    validate: (value) => value.trim().length > 0 || 'Module name is required',
                },
                {
                    type: 'input',
                    name: 'model',
                    message: 'Model:',
                    default: (answers) => answers.module,
                },
                {
                    type: 'input',
                    name: 'namespace',
                    message: 'Namespace:',
                    validate: (value) => value.trim().length > 0 || 'Namespace is required',
                },
                {
                    type: 'input',
                    name: 'route',
                    message: 'Route:',
                    validate: (value) => value.trim().length > 0 || 'Route is required',
                },
                {
                    type: 'confirm',
                    name: 'generate',
                    message: 'Are you sure you want to generate these files?',
                    default: false,
                },
            ]);
            if (!answers.generate) {
                console.log('\n⚠ Generation cancelled.\n');
                return;
            }
            const payload = {
                ...answers,
                project,
                operation,
            };

            switch (operation) {
                case 'crud':
                    await new CrudGenerator(payload).run();
                    break;

                case 'table':
                    await new TableGenerator(payload).run();
                    break;

                case 'interface':
                    await new InterfaceGenerator(payload).run();
                    break;

                default:
                    throw new Error(`Unknown generator: ${operation}`);
            }

            console.log('\n✅ Generation completed successfully.\n');
        } catch (error) {
            console.error('\n❌ Error\n');
            console.error(error.message);
        }
    }
}
