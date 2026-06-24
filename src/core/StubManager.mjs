import fs from 'fs';
import path from 'path';

import { Config } from '../config/Config.mjs';
import { TemplateEngine } from './TemplateEngine.mjs';

export class StubManager {
    constructor(data = null) {
        this.projectRoot = data?.project?.root;
        this.operation = data?.operation;
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
        return path.resolve(this.projectRoot, Config.stubs(this.projectRoot), this.operation);
    }

    packageStubPath() {
        return path.resolve(import.meta.dirname, '../stubs/', this.operation);
    }

    /*
    |--------------------------------------------------------------------------
    | Find Stub
    |--------------------------------------------------------------------------
    */

    resolve(stub) {
        const projectStub = path.join(this.projectStubPath(), stub);
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
        return TemplateEngine.render(this.get(stub), context);
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
