import path from 'path';
import { Config } from '../config/Config.mjs';
import { Utils } from '../utils/Utils.mjs';

export class ContextBuilder {
    constructor(data) {
        this.data = data;
        this.projectRoot = data?.project?.root;
    }
    path(key) {
        if (typeof Config[key] !== 'function') {
            throw new Error(`Config.${key} is not a function`);
        }
        return Config[key](this.projectRoot);
    }
    build() {
        const namespace = this.data?.namespace;
        const module = this.data?.module;
        const model = this.data?.model;
        const route = this.data?.route.toLowerCase();
        const space = Utils.joinBackSlash(namespace);
        const firstPath = Utils.getFirstPath(namespace.toLowerCase());
        const guard = firstPath === 'admin' ? 'admin' : firstPath === 'user' ? 'web' : firstPath;
        const auth = firstPath === 'admin' ? 'Admin' : firstPath.toUpperCase();
        const pagePath = Utils.addPage(namespace.toLowerCase());
        const view = Utils.convertPath(pagePath, '/', '.');
        const lang = namespace.toLowerCase();
        const title = Utils.convertPath(namespace, '/', ' | ');
        const name = Utils.toSentenceCase(module, ' ');
        const name_lower = Utils.toSentenceCase(module, ' ').toLowerCase();
        const breadcrumbs = Utils.generateBreadCrumbs(route, firstPath);
        const download = Utils.toSnakeCase(module);
        const table = Utils.tableName(model);
        const snake = Utils.toSnakeCase(module);
        const scriptPath = Utils.excludeFirstPath(namespace).toLowerCase();
        const scriptRoutePath = Utils.excludeLastPath(Utils.excludeLastPath(pagePath));
        const routePath = Utils.excludeLastPath(namespace);

        // file path
        const getControllerFile = path.join(this.path('controller'), namespace, `${module}GetController.php`);
        const postControllerFile = path.join(this.path('controller'), namespace, `${module}PostController.php`);
        const apiControllerFile = path.join(this.path('controller'), namespace, `${module}ApiController.php`);
        const createRequestFile = path.join(this.path('request'), namespace, `ValidateCreate${module}.php`);
        const updateRequestFile = path.join(this.path('request'), namespace, `ValidateUpdate${module}.php`);
        const modelFile = path.join(this.path('model'), `${model}.php`);
        const providerFile = path.join(this.path('provider'), `${Utils.toCapitalize(firstPath)}RepositoryServiceProvider.php`);
        const interfaceFile = path.join(this.path('repository'), namespace, `${module}Interface.php`);
        const repositoryFile = path.join(this.path('repository'), namespace, `${module}Repository.php`);
        const migrationFile = path.join(this.path('migration'), Utils.migrationFile(model));
        const scriptFile = path.join(this.path('script'), `${pagePath.toLowerCase()}.js`);
        const scriptRouteFile = path.join(this.path('script'), scriptRoutePath.toLowerCase(), `pages.js`);
        const langFile = path.join(this.path('lang'), `${namespace.toLowerCase()}.php`);
        const viewFile = path.join(this.path('view'), pagePath, `view${module}.blade.php`);
        const viewAddFile = path.join(this.path('view'), pagePath, 'includes', 'viewAdd.blade.php');
        const viewEditFile = path.join(this.path('view'), pagePath, 'includes', 'viewEdit.blade.php');
        const routeFile = path.join(this.path('route'), routePath, `${snake}.php`);
        return {
            namespace,
            module,
            model,
            route,
            space,
            firstPath,
            guard,
            auth,
            pagePath,
            view,
            lang,
            title,
            name,
            name_lower,
            breadcrumbs,
            download,
            table,
            snake,
            scriptPath,
            scriptRoutePath,
            getControllerFile,
            postControllerFile,
            apiControllerFile,
            createRequestFile,
            updateRequestFile,
            modelFile,
            providerFile,
            interfaceFile,
            repositoryFile,
            migrationFile,
            scriptFile,
            scriptRouteFile,
            langFile,
            viewFile,
            viewAddFile,
            viewEditFile,
            routeFile,
        };
    }
}
