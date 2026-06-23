import path from 'path';

import { Config } from '../config/Config.mjs';
import { FileWriter } from '../core/FileWriter.mjs';
import { StubManager } from '../core/StubManager.mjs';

import { BaseInjector } from './BaseInjector.mjs';

export class ScriptInjector extends BaseInjector {
    constructor(project, context) {
        super();
        this.project = project;
        this.context = context;
        this.stubManager = new StubManager(Config.stubs(project.root));
    }

    inject() {
        const scriptRouteFile = path.join(Config.script(this.project.root), 'routes', 'index.js');
        if (!FileWriter.exists(scriptRouteFile)) {
            throw new Error('resources/js/routes/index.js not found');
        }
        let content = FileWriter.read(scriptRouteFile);
        const route = this.stubManager.render('crud/script-route.stub', this.context);
        content = this.insertUnique(content, '// <orians-script-routes>', route);
        FileWriter.write(scriptRouteFile, content);
        console.log('✔ Script Route Updated');
    }
}
