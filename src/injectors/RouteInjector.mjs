import path from 'path';

import { Config } from '../config/Config.mjs';
import { FileWriter } from '../core/FileWriter.mjs';
import { StubManager } from '../core/StubManager.mjs';

import { BaseInjector } from './BaseInjector.mjs';

export class RouteInjector extends BaseInjector {
    constructor(project, context) {
        super();
        this.project = project;
        this.context = context;
        this.stubManager = new StubManager(Config.stubs(project.root));
    }
    inject() {
        const routeFile = path.join(Config.route(this.project.root), 'index.php');
        if (!FileWriter.exists(routeFile)) {
            throw new Error('routes/web/index.php not found');
        }
        let content = FileWriter.read(routeFile);
        const route = this.stubManager.render('crud/route-include.stub', this.context);
        content = this.insertUnique(content, '// <orians-routes>', route);
        FileWriter.write(routeFile, content);
        console.log('✔ Route Updated');
    }
}
