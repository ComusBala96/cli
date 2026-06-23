// src/generators/CrudGenerator.mjs

import path from 'path';

import { BaseGenerator } from './BaseGenerator.mjs';

import { ProviderInjector } from '../injectors/ProviderInjector.mjs';
import { RouteInjector } from '../injectors/RouteInjector.mjs';
import { ScriptInjector } from '../injectors/ScriptInjector.mjs';

export class CrudGenerator extends BaseGenerator {
    async generate(data) {
        this.data = data;
        const namespace = this.context.namespacePath;
        /*
        |--------------------------------------------------------------------------
        | Controllers
        |--------------------------------------------------------------------------
        */
        this.write(path.join(this.path('controller'), namespace, `${this.context.name}GetController.php`), this.render('get-controller.stub'));
        this.write(path.join(this.path('controller'), namespace, `${this.context.name}PostController.php`), this.render('post-controller.stub'));
        this.write(path.join(this.path('controller'), namespace, `${this.context.name}ApiController.php`), this.render('api-controller.stub'));
        /*
        |--------------------------------------------------------------------------
        | Requests
        |--------------------------------------------------------------------------
        */
        this.write(path.join(this.path('request'), namespace, `ValidateCreate${this.context.name}.php`), this.render('create-request.stub'));
        this.write(path.join(this.path('request'), namespace, `ValidateUpdate${this.context.name}.php`), this.render('update-request.stub'));
        /*
        |--------------------------------------------------------------------------
        | Repository
        |--------------------------------------------------------------------------
        */
        this.write(path.join(this.path('repository'), namespace, `${this.context.name}Interface.php`), this.render('interface.stub'));
        this.write(path.join(this.path('repository'), namespace, `${this.context.name}Repository.php`), this.render('repository.stub'));
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
        this.write(path.join(this.path('lang'), `${this.context.namespace}.php`), this.render('lang.stub'));
        /*
        |--------------------------------------------------------------------------
        | Views
        |--------------------------------------------------------------------------
        */
        const viewPath = path.join(this.path('view'), namespace);
        this.write(path.join(viewPath, `view${this.context.name}.blade.php`), this.render('view.stub'));
        this.write(path.join(viewPath, 'includes', 'viewAdd.blade.php'), this.render('view-add.stub'));
        this.write(path.join(viewPath, 'includes', 'viewEdit.blade.php'), this.render('view-edit.stub'));
        /*
        |--------------------------------------------------------------------------
        | Scripts
        |--------------------------------------------------------------------------
        */
        this.write(path.join(this.path('script'), namespace, 'index.js'), this.render('script.stub'));
        /*
        |--------------------------------------------------------------------------
        | Route
        |--------------------------------------------------------------------------
        */
        this.write(path.join(this.path('route'), `${this.context.routeFile}.php`), this.render('route.stub'));
        /*
        |--------------------------------------------------------------------------
        | Injectors
        |--------------------------------------------------------------------------
        */
        await new ProviderInjector().inject(this.projectRoot, this.context);
        await new RouteInjector().inject(this.projectRoot, this.context);
        await new ScriptInjector().inject(this.projectRoot, this.context);
    }
}
