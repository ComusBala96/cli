import type { Command } from 'commander';
import chalk from 'chalk';
import { execSync } from 'node:child_process';

export function buildCommand(program: Command): void {
    program
        .command('build')
        .description('Run Orians sync + Vite build')
        .action(async () => {
            execSync('orians manifest', { stdio: 'inherit' });
            execSync('orians sync', { stdio: 'inherit' });
            execSync('vite build', { stdio: 'inherit' });

            console.log(chalk.green('✔ Orians build complete'));
        });
}
