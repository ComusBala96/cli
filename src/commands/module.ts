import type { Command } from 'commander';
import chalk from 'chalk';
import path from 'node:path';
import { cwd, writeFile } from '../services/file.js';
import { moduleIndexTemplate, modulePageTemplate } from '../services/templates.js';

export function moduleCommand(program: Command): void {
    program
        .command('make:module <name>')
        .description('Create a new Orians frontend module')
        .action(async (name: string) => {
            const base = cwd('resources/ts/modules', name);

            await writeFile(path.join(base, 'index.ts'), moduleIndexTemplate(name));
            await writeFile(path.join(base, `${name}.page.ts`), modulePageTemplate(name));

            console.log(chalk.green(`✔ Module created: ${name}`));
        });
}
