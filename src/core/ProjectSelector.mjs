import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

import { Config } from '../config/Config.mjs';

export class ProjectSelector {
    static async select() {
        /*
        |--------------------------------------------------------------------------
        | Standalone Laravel Project
        |--------------------------------------------------------------------------
        */

        if (!Config.workspace()) {
            return {
                platform: 'laravel',
                name: path.basename(Config.root()),
                root: Config.root(),
            };
        }

        /*
        |--------------------------------------------------------------------------
        | Select Platform
        |--------------------------------------------------------------------------
        */

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

        let platformRoot;

        switch (platform) {
            case 'web':
                platformRoot = Config.webRoot();
                break;

            case 'mobile':
                platformRoot = Config.mobileRoot();
                break;

            case 'desktop':
                platformRoot = Config.desktopRoot();
                break;

            default:
                throw new Error(`Invalid platform: ${platform}`);
        }

        if (!fs.existsSync(platformRoot)) {
            throw new Error(`${platformRoot} not found`);
        }

        /*
        |--------------------------------------------------------------------------
        | Find Projects
        |--------------------------------------------------------------------------
        */

        const projects = fs
            .readdirSync(platformRoot, { withFileTypes: true })
            .filter((item) => item.isDirectory())
            .map((item) => ({
                name: item.name,
                value: item.name,
            }));

        if (!projects.length) {
            throw new Error(`No projects found in ${platformRoot}`);
        }

        /*
        |--------------------------------------------------------------------------
        | Select Project
        |--------------------------------------------------------------------------
        */
        const { project } = await inquirer.prompt([
            {
                type: 'list',
                name: 'project',
                message: 'Select Project',
                choices: projects,
            },
        ]);
        return {
            platform,
            name: project,
            root: path.join(platformRoot, project),
        };
    }

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    */

    static projects(dir) {
        if (!fs.existsSync(dir)) {
            return [];
        }
        return fs
            .readdirSync(dir, { withFileTypes: true })
            .filter((item) => item.isDirectory())
            .map((item) => item.name);
    }

    static currentProject() {
        return {
            platform: 'laravel',
            name: path.basename(Config.root()),
            root: Config.root(),
        };
    }
}
