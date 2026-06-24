// src/generators/BaseGenerator.mjs

import path from 'path';

import { Config } from '../config/Config.mjs';
import { ContextBuilder } from '../core/ContextBuilder.mjs';
import { TemplateEngine } from '../core/TemplateEngine.mjs';
import { StubManager } from '../core/StubManager.mjs';
import { FileWriter } from '../core/FileWriter.mjs';

export class BaseGenerator {
    constructor(data) {
        this.data = data;
        this.project = data?.project;
        this.projectRoot = data?.project?.root;
        this.context = ContextBuilder.build(data);
        this.stubManager = new StubManager(this.data);
    }

    render(stubName) {
        const stub = this.stubManager.get(stubName);
        return TemplateEngine.render(stub, this.context);
    }

    write(file, content) {
        FileWriter.write(file, content);
    }

    path(key) {
        if (typeof Config[key] !== 'function') {
            throw new Error(`Config.${key} is not a function`);
        }
        return Config[key](this.projectRoot);
    }
}
