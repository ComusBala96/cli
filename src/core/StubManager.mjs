import fs from 'fs';
import path from 'path';

import { Config } from '../config/Config.mjs';
import { TemplateEngine } from './TemplateEngine.mjs';

export class StubManager {
    constructor(projectRoot = null) {
        this.projectRoot = projectRoot;
        this.engine = new TemplateEngine();
    }

    /*
    |--------------------------------------------------------------------------
    | Stub Paths
    |--------------------------------------------------------------------------
    */

    projectStubPath() {
        if (!this.projectRoot) {
            return null;
        }

        return path.join(this.projectRoot, Config.path('stubs'));
    }

    packageStubPath() {
        return path.resolve(import.meta.dirname, '../../stubs');
    }

    /*
    |--------------------------------------------------------------------------
    | Find Stub
    |--------------------------------------------------------------------------
    */

    resolve(stub) {
        const projectStub = this.projectRoot ? path.join(this.projectStubPath(), stub) : null;
        if (projectStub && fs.existsSync(projectStub)) {
            return projectStub;
        }
        const packageStub = path.join(this.packageStubPath(), stub);
        if (fs.existsSync(packageStub)) {
            return packageStub;
        }
        throw new Error(`Stub not found: ${stub}`);
    }

    /*
    |--------------------------------------------------------------------------
    | Raw Content
    |--------------------------------------------------------------------------
    */

    get(stub) {
        const file = this.resolve(stub);
        return fs.readFileSync(file, 'utf8');
    }

    /*
    |--------------------------------------------------------------------------
    | Exists
    |--------------------------------------------------------------------------
    */

    exists(stub) {
        try {
            this.resolve(stub);
            return true;
        } catch {
            return false;
        }
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    render(stub, context = {}) {
        return this.engine.render(this.get(stub), context);
    }

    /*
    |--------------------------------------------------------------------------
    | List
    |--------------------------------------------------------------------------
    */

    list(directory = '') {
        const base = path.join(this.projectStubPath() ?? this.packageStubPath(), directory);
        if (!fs.existsSync(base)) {
            return [];
        }
        return fs.readdirSync(base);
    }
}
