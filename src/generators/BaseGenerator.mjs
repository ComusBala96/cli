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
        this.project = data.project;
        this.projectRoot = data.project.root;
        this.context = ContextBuilder.build(data);
        this.stubManager = new StubManager(Config.stubs(this.projectRoot));
        this.templateEngine = new TemplateEngine();
        this.fileWriter = new FileWriter();
    }

    render(stubName) {
        const stub = this.stubManager.get(stubName);
        return this.templateEngine.render(stub, this.context);
    }

    write(file, content) {
        this.fileWriter.write(file, content);
    }

    path(key) {
        return Config[key](this.projectRoot);
    }
}
