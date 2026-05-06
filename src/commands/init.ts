import type { Command } from 'commander';
import chalk from 'chalk';
import { cwd, writeFile, exists } from '../services/file.js';

export function initCommand(program: Command): void {
    program
        .command('init')
        .description('Initialize Orians config in current Laravel/Vite project')
        .action(async () => {
            const configPath = cwd('orians.config.json');

            if (await exists(configPath)) {
                console.log(chalk.yellow('orians.config.json already exists'));
                return;
            }

            await writeFile(
                configPath,
                JSON.stringify(
                    {
                        namespace: 'App',
                        source: {
                            pages: 'resources/ts/pages',
                            modules: 'resources/ts/modules',
                            resources: 'resources/ts/resources',
                            schemas: 'resources/ts/schemas',
                            lang: 'resources/lang',
                        },
                        output: {
                            manifest: 'storage/app/orians/manifest.json',
                            generated: 'resources/ts/.generated',
                        },
                        laravel: {
                            configKey: 'orians',
                            routePrefix: 'admin',
                        },
                    },
                    null,
                    2,
                ),
            );

            console.log(chalk.green('✔ Orians initialized'));
        });
}
