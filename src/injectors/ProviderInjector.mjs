import path from 'path';

import { Config } from '../config/Config.mjs';
import { FileWriter } from '../core/FileWriter.mjs';
import { StubManager } from '../core/StubManager.mjs';

import { BaseInjector } from './BaseInjector.mjs';
import { Utils } from '../utils/Utils.mjs';

export class ProviderInjector extends BaseInjector {
    constructor(project, context) {
        super();
        this.project = project;
        this.context = context;
        this.stubManager = new StubManager(Config.stubs(project.root));
    }

    inject() {
        const providerFile = path.join(Config.provider(this.project.root), Utils.toCapitalize(this.context.firstPath) + 'RepositoryServiceProvider.php');
        if (!FileWriter.exists(providerFile)) {
            throw new Error(Utils.toCapitalize(this.context.firstPath) + 'RepositoryServiceProvider.php not found');
        }
        let content = FileWriter.read(providerFile);
        const useStatement = this.stubManager.render('provider-use.stub', this.context);
        const binding = this.stubManager.render('provider-binding.stub', this.context);
        content = this.insertUnique(content, '// <orians-provider-use>', useStatement);
        content = this.insertUnique(content, '// <orians-provider-bindings>', binding);
        FileWriter.write(providerFile, content);
        console.log('✔ Provider Updated');
    }
}
