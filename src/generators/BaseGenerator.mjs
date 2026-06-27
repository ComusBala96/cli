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
        this.context = new ContextBuilder(data).build();
        this.stubManager = new StubManager(data);
    }

    render(stubName) {
        const stub = this.stubManager.get(stubName);
        return TemplateEngine.render(stub, this.context);
    }

    write(file, content) {
        FileWriter.write(file, content);
    }

    remove(file, stopAt) {
        FileWriter.remove(file, stopAt);
    }

    inject(file, content, marker, key) {
        FileWriter.injectBlock(file, marker, key, content);
    }

    updateInject(file, content, key) {
        FileWriter.updateBlock(file, key, content);
    }

    removeInject(file, key) {
        FileWriter.removeBlock(file, key);
    }
}
