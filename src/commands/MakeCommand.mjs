import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

import { Config } from '../config/Config.mjs';

import { CrudGenerator } from '../generators/CrudGenerator.mjs';
import { TableGenerator } from '../generators/TableGenerator.mjs';
import { InterfaceGenerator } from '../generators/InterfaceGenerator.mjs';

export class MakeCommand {
    async run() {
        try {
            const project = await this.selectProject();
            const { operation } = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'operation',
                    message: 'Select Generator',
                    choices: [
                        {
                            name: 'CRUD Generator',
                            value: 'crud',
                        },
                        {
                            name: 'Table Generator',
                            value: 'table',
                        },
                        {
                            name: 'Interface Generator',
                            value: 'interface',
                        },
                    ],
                },
            ]);
            const answers = await inquirer.prompt([
                {
                    type: 'input',
                    name: 'module',
                    message: 'Module Name',
                    validate: (value) => value.length > 0 || 'Module name is required',
                },
                {
                    type: 'input',
                    name: 'model',
                    message: 'Model Name',
                    default: (answers) => answers.name,
                },
                {
                    type: 'input',
                    name: 'namespace',
                    message: 'Namespace',
                    validate: (value) => value.length > 0 || 'Namespace is required',
                },
            ]);
            const payload = {
                ...answers,
                project,
            };
            switch (operation) {
                case 'crud':
                    await new CrudGenerator().generate(payload);
                    break;
                case 'table':
                    await new TableGenerator().generate(payload);
                    break;
                case 'interface':
                    await new InterfaceGenerator().generate(payload);
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

    async selectProject() {
        if (!Config.workspace()) {
            return {
                type: 'laravel',
                name: path.basename(Config.root()),
                root: Config.root(),
            };
        }

        const { platform } = await inquirer.prompt([
            {
                type: 'list',
                name: 'platform',
                message: 'Select Platform',
                choices: [
                    {
                        name: 'Web',
                        value: 'web',
                    },
                    {
                        name: 'Mobile',
                        value: 'mobile',
                    },
                    {
                        name: 'Desktop',
                        value: 'desktop',
                    },
                ],
            },
        ]);
        let projectsRoot;
        switch (platform) {
            case 'web':
                projectsRoot = Config.webRoot();
                break;
            case 'mobile':
                projectsRoot = Config.mobileRoot();
                break;
            case 'desktop':
                projectsRoot = Config.desktopRoot();
                break;
            default:
                throw new Error('Invalid platform');
        }
        const projects = fs.readdirSync(projectsRoot).filter((project) => fs.statSync(path.join(projectsRoot, project)).isDirectory());
        const { project } = await inquirer.prompt([
            {
                type: 'list',
                name: 'project',
                message: 'Select Project',
                choices: projects,
            },
        ]);

        return {
            type: platform,
            name: project,
            root: path.join(projectsRoot, project),
        };
    }
}
