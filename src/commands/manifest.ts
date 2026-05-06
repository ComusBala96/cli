import type { Command } from 'commander';
import chalk from 'chalk';
import { buildManifest } from '../services/manifest.js';
import { cwd } from '../services/file.js';
import { writeJson } from '../services/json.js';

export function manifestCommand(program: Command): void {
    program
        .command('manifest')
        .description('Build Orians resource manifest')
        .action(async () => {
            const manifest = await buildManifest();
            const file = cwd('storage/app/orians/manifest.json');

            await writeJson(file, manifest);

            console.log(chalk.green(`✔ Manifest generated: ${file}`));
        });
}
