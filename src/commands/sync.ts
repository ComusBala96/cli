import type { Command } from 'commander';
import chalk from 'chalk';
import path from 'node:path';
import { buildManifest } from '../services/manifest.js';
import { cwd, writeFile } from '../services/file.js';

function importMap(name: string, entries: Record<string, string>): string {
    const rows = Object.entries(entries)
        .map(([key, file]) => `  "${key}": () => import("${slash(path.relative(cwd('resources/ts/.generated'), file))}")`)
        .join(',\n');

    return `export const ${name} = {\n${rows}\n} as const;\n`;
}

function slash(v: string): string {
    return v.replace(/\\/g, '/').replace(/^/, '../');
}

export function syncCommand(program: Command): void {
    program
        .command('sync')
        .description('Generate Orians runtime imports')
        .action(async () => {
            const manifest = await buildManifest();
            const outDir = cwd('resources/ts/.generated');

            await writeFile(path.join(outDir, 'pages.ts'), importMap('pageImports', manifest.pages));
            await writeFile(path.join(outDir, 'modules.ts'), importMap('moduleImports', manifest.modules));
            await writeFile(path.join(outDir, 'resources.ts'), importMap('resourceImports', manifest.resources));
            await writeFile(path.join(outDir, 'schemas.ts'), importMap('schemaImports', manifest.schemas));

            await writeFile(path.join(outDir, 'manifest.ts'), `export const oriansManifest = ${JSON.stringify(manifest, null, 2)} as const;\n`);

            console.log(chalk.green('✔ Orians sync completed'));
        });
}
