import { Config } from '../config/Config.mjs';
import { BaseGenerator } from './BaseGenerator.mjs';
export class CrudGenerator extends BaseGenerator {
    async run() {
        this.write(this.context.getControllerFile, this.render('get-controller.stub'));
        this.write(this.context.postControllerFile, this.render('post-controller.stub'));
        this.write(this.context.apiControllerFile, this.render('api-controller.stub'));
        this.write(this.context.createRequestFile, this.render('request-create.stub'));
        this.write(this.context.updateRequestFile, this.render('request-update.stub'));
        this.write(this.context.modelFile, this.render('model.stub'));
        this.inject(this.context.providerFile, this.render('provider-use.stub'), '// <orians-provider-use>', `${this.context.module}/use`);
        this.inject(this.context.providerFile, this.render('provider-binding.stub'), '// <orians-provider-bindings>', `${this.context.module}/binding`);
        this.write(this.context.interfaceFile, this.render('interface.stub'));
        this.write(this.context.repositoryFile, this.render('repository.stub'));
        this.write(this.context.migrationFile, this.render('migration.stub'));
        this.write(this.context.scriptFile, this.render('script.stub'));
        this.inject(this.context.scriptRouteFile, this.render('script-route.stub'), '// <orians-script-routes>', `${this.context.module}/route`);
        this.write(this.context.langFile, this.render('lang.stub'));
        this.write(this.context.viewFile, this.render('view.stub'));
        this.write(this.context.viewAddFile, this.render('view-add.stub'));
        this.write(this.context.viewEditFile, this.render('view-edit.stub'));
        this.write(this.context.routeFile, this.render('route.stub'));
    }
    async delete() {
        this.remove(this.context.getControllerFile, Config.controller(this.projectRoot));
        this.remove(this.context.postControllerFile, Config.controller(this.projectRoot));
        this.remove(this.context.apiControllerFile, Config.controller(this.projectRoot));
        this.remove(this.context.createRequestFile, Config.request(this.projectRoot));
        this.remove(this.context.updateRequestFile, Config.request(this.projectRoot));
        this.remove(this.context.modelFile, Config.model(this.projectRoot));
        this.removeInject(this.context.providerFile, `${this.context.module}/use`);
        this.removeInject(this.context.providerFile, `${this.context.module}/binding`);
        this.remove(this.context.interfaceFile, Config.repository(this.projectRoot));
        this.remove(this.context.repositoryFile, Config.repository(this.projectRoot));
        this.remove(this.context.migrationFile, Config.migration(this.projectRoot));
        this.remove(this.context.scriptFile, Config.script(this.projectRoot));
        this.removeInject(this.context.scriptRouteFile, `${this.context.module}/route`);
        this.remove(this.context.langFile, Config.lang(this.projectRoot));
        this.remove(this.context.viewFile, Config.view(this.projectRoot));
        this.remove(this.context.viewAddFile, Config.view(this.projectRoot));
        this.remove(this.context.viewEditFile, Config.view(this.projectRoot));
        this.remove(this.context.routeFile, Config.route(this.projectRoot));
    }
}
