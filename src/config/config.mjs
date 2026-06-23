import fs from 'fs';
import path from 'path';

export class Config {
    static configFile = 'os.config.json';

    static find() {
        let current = process.cwd();
        while (current !== path.parse(current).root) {
            const file = path.join(current, this.configFile);
            if (fs.existsSync(file)) {
                return file;
            }
            current = path.dirname(current);
        }
        throw new Error('os.config.json not found. Run "os init" first.');
    }

    static load() {
        return JSON.parse(fs.readFileSync(this.find(), 'utf8'));
    }

    static root() {
        const config = this.load();
        return path.resolve(path.dirname(this.find()), config.root || '.');
    }

    static workspace() {
        return this.load().workspace === true;
    }

    static webRoot() {
        const config = this.load();
        return path.join(this.root(), config.web);
    }

    static mobileRoot() {
        const config = this.load();
        return path.join(this.root(), config.mobile);
    }

    static desktopRoot() {
        const config = this.load();
        return path.join(this.root(), config.desktop);
    }

    static laravel() {
        return this.load().paths.laravel;
    }

    static laravelPath(key) {
        const paths = this.laravel();
        if (!paths[key]) {
            throw new Error(`Laravel path "${key}" not found in os.config.json`);
        }

        return paths[key];
    }

    static projectPath(projectRoot, key) {
        return path.join(projectRoot, this.laravelPath(key));
    }

    static controller(projectRoot) {
        return this.projectPath(projectRoot, 'controller');
    }

    static request(projectRoot) {
        return this.projectPath(projectRoot, 'request');
    }

    static model(projectRoot) {
        return this.projectPath(projectRoot, 'model');
    }

    static repository(projectRoot) {
        return this.projectPath(projectRoot, 'repository');
    }

    static provider(projectRoot) {
        return this.projectPath(projectRoot, 'provider');
    }

    static migration(projectRoot) {
        return this.projectPath(projectRoot, 'migration');
    }

    static route(projectRoot) {
        return this.projectPath(projectRoot, 'route');
    }

    static view(projectRoot) {
        return this.projectPath(projectRoot, 'view');
    }

    static lang(projectRoot) {
        return this.projectPath(projectRoot, 'lang');
    }

    static script(projectRoot) {
        return this.projectPath(projectRoot, 'script');
    }

    static stubs(projectRoot) {
        return this.projectPath(projectRoot, 'stubs');
    }
}
