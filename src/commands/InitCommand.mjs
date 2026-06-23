import fs from 'fs';
import path from 'path';
import inquirer from 'inquirer';

export class InitCommand {
    async run() {
        const { workspace } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'workspace',
                message: 'Is this a monorepo workspace?',
                default: false,
            },
        ]);
        const config = {
            workspace,
            root: '.',
            paths: {
                laravel: {
                    controller: 'app/Http/Controllers',
                    request: 'app/Http/Requests',
                    model: 'app/Models',
                    repository: 'app/Repositories',
                    provider: 'app/Providers/Repositories',
                    migration: 'database/migrations',
                    route: 'routes/web',
                    view: 'resources/views',
                    lang: 'resources/lang',
                    script: 'resources/js',
                    stubs: 'resources/stubs',
                },
            },
        };
        if (workspace) {
            config.web = 'projects/web';
            config.mobile = 'projects/mobile';
            config.desktop = 'projects/desktop';
        }
        const file = path.join(process.cwd(), 'os.config.json');
        fs.writeFileSync(file, JSON.stringify(config, null, 4), 'utf8');
        console.log('\n✅ os.config.json generated successfully\n');
        console.log(file);
    }
}
