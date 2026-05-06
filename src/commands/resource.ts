import type { Command } from 'commander';
import chalk from 'chalk';
import path from 'node:path';
import { cwd, writeFile } from '../services/file.js';

export function resourceCommand(program: Command): void {
    program
        .command('make:resource <name>')
        .description('Create schema resource')
        .action(async (name: string) => {
            const file = cwd('resources/ts/resources', `${name}.resource.ts`);

            await writeFile(
                file,
                `import { defineResource } from '@orians/core';

export default defineResource({
  name: '${name}',
  endpoint: '/api/${name}',
  schema: '${name}'
});
`,
            );

            const schema = cwd('resources/ts/schemas', `${name}.schema.ts`);

            await writeFile(
                schema,
                `import { defineSchema } from '@orians/core';

export default defineSchema({
  name: '${name}',
  fields: [
    { key: 'id', label: 'ID', type: 'number' },
    { key: 'name', label: 'Name', type: 'text', required: true }
  ]
});
`,
            );

            console.log(chalk.green(`✔ Resource created: ${name}`));
        });
}
