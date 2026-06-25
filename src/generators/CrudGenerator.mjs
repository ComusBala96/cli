import { BaseGenerator } from './BaseGenerator.mjs';
export class CrudGenerator extends BaseGenerator {
    async run() {
        this.write(this.context.getControllerFile, this.render('get-controller.stub'));
        this.write(this.context.postControllerFile, this.render('post-controller.stub'));
        this.write(this.context.apiControllerFile, this.render('api-controller.stub'));
        this.write(this.context.createRequestFile, this.render('request-create.stub'));
        this.write(this.context.updateRequestFile, this.render('request-update.stub'));
        this.write(this.context.modelFile, this.render('model.stub'));
        this.inject(this.context.providerFile, this.render('provider-use.stub'), '// <orians-provider-use>');
        this.inject(this.context.providerFile, this.render('provider-binding.stub'), '// <orians-provider-bindings>');
        this.write(this.context.interfaceFile, this.render('interface.stub'));
        this.write(this.context.repositoryFile, this.render('repository.stub'));
        this.write(this.context.migrationFile, this.render('migration.stub'));
        this.write(this.context.scriptFile, this.render('script.stub'));
        this.inject(this.context.scriptRouteFile, this.render('script-route.stub'),'// <orians-script-routes>');
        this.write(this.context.langFile, this.render('lang.stub'));
        this.write(this.context.viewFile, this.render('view.stub'));
        this.write(this.context.viewAddFile, this.render('view-add.stub'));
        this.write(this.context.viewEditFile, this.render('view-edit.stub'));
        this.write(this.context.routeFile, this.render('route.stub'));
    }
}
