// src/generators/CrudGenerator.mjs

import path from 'path';

import { BaseGenerator } from './BaseGenerator.mjs';

import { ProviderInjector } from '../injectors/ProviderInjector.mjs';
import { RouteInjector } from '../injectors/RouteInjector.mjs';
import { ScriptInjector } from '../injectors/ScriptInjector.mjs';

export class CrudGenerator extends BaseGenerator {
    async run() {
        const namespace = this.context.namespace;
        /*
        |--------------------------------------------------------------------------
        | Controllers
        |--------------------------------------------------------------------------
        */
        this.write(path.join(this.path('controller'), namespace, `${this.context.module}GetController.php`), this.render('get-controller.stub'));
        this.write(path.join(this.path('controller'), namespace, `${this.context.module}PostController.php`), this.render('post-controller.stub'));
        this.write(path.join(this.path('controller'), namespace, `${this.context.module}ApiController.php`), this.render('api-controller.stub'));
        /*
        |--------------------------------------------------------------------------
        | Requests
        |--------------------------------------------------------------------------
        */
        this.write(path.join(this.path('request'), namespace, `ValidateCreate${this.context.module}.php`), this.render('request-create.stub'));
        this.write(path.join(this.path('request'), namespace, `ValidateUpdate${this.context.module}.php`), this.render('request-update.stub'));
        /*
        |--------------------------------------------------------------------------
        | Repository
        |--------------------------------------------------------------------------
        */
        this.write(path.join(this.path('repository'), namespace, `${this.context.module}Interface.php`), this.render('interface.stub'));
        this.write(path.join(this.path('repository'), namespace, `${this.context.module}Repository.php`), this.render('repository.stub'));
        /*
        |--------------------------------------------------------------------------
        | Model
        |--------------------------------------------------------------------------
        */
        this.write(path.join(this.path('model'), `${this.context.model}.php`), this.render('model.stub'));
        /*
        |--------------------------------------------------------------------------
        | Migration
        |--------------------------------------------------------------------------
        */
        this.write(path.join(this.path('migration'), this.context.migrationFile), this.render('migration.stub'));
        /*
        |--------------------------------------------------------------------------
        | Lang
        |--------------------------------------------------------------------------
        */
        this.write(path.join(this.path('lang'), `${namespace.toLowerCase()}.php`), this.render('lang.stub'));
        /*
        |--------------------------------------------------------------------------
        | Views
        |--------------------------------------------------------------------------
        */
        const viewPath = path.join(this.path('view'), this.context.pagePath);
        this.write(path.join(viewPath, `view${this.context.module}.blade.php`), this.render('view.stub'));
        this.write(path.join(viewPath, 'includes', 'viewAdd.blade.php'), this.render('view-add.stub'));
        this.write(path.join(viewPath, 'includes', 'viewEdit.blade.php'), this.render('view-edit.stub'));
        /*
        |--------------------------------------------------------------------------
        | Scripts
        |--------------------------------------------------------------------------
        */
        this.write(path.join(this.path('script'), this.context.pagePath.toLowerCase() + '.js'), this.render('script.stub'));
        /*
        |--------------------------------------------------------------------------
        | Route
        |--------------------------------------------------------------------------
        */
        this.write(path.join(this.path('route'), `${namespace.toLowerCase()}.php`), this.render('route.stub'));
        /*
        |--------------------------------------------------------------------------
        | Injectors
        |--------------------------------------------------------------------------
        */
        await new ProviderInjector(this.projectRoot, this.context).inject();
        // await new RouteInjector(this.projectRoot, this.context).inject();
        await new ScriptInjector(this.projectRoot, this.context).inject();
    }
}
