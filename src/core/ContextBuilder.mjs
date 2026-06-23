import { Utils } from '../utils/Utils.mjs';

export class ContextBuilder {
    static build(data) {
        const namespace = data.namespace.toLowerCase();
        const module = Utils.toPascalCase(data.module);
        const model = Utils.toPascalCase(data.model || data.module);
        const namespaceArray = namespace.split('/');
        const authGuard = namespaceArray[0] === 'admin' ? 'admin' : 'web';
        const authModel = namespaceArray[0] === 'admin' ? 'Admin' : 'User';
        const pagePath = Utils.addPagePath(namespace);
        const viewPath = Utils.convertToDotPath(namespace);
        const title = Utils.toCapitalize(namespace);
        const sentenceName = Utils.toSentenceCase(Utils.toCapitalize(data.module.toLowerCase()));
        return {
            /*
            |--------------------------------------------------------------------------
            | Raw
            |--------------------------------------------------------------------------
            */
            ...data,
            /*
            |--------------------------------------------------------------------------
            | Names
            |--------------------------------------------------------------------------
            */
            module,
            model,
            /*
            |--------------------------------------------------------------------------
            | Namespace
            |--------------------------------------------------------------------------
            */
            namespace,
            namespaceArray,
            namespacePath: namespace,
            namespaceDot: viewPath,
            namespaceSlash: namespace,
            space: Utils.joinBackSlash(namespace),
            /*
            |--------------------------------------------------------------------------
            | Model
            |--------------------------------------------------------------------------
            */
            table: Utils.tableName(model),
            migrationFile: Utils.migrationFile(model),
            /*
            |--------------------------------------------------------------------------
            | View
            |--------------------------------------------------------------------------
            */
            pagePath,
            viewPath,
            viewName: `view${module}`,
            /*
            |--------------------------------------------------------------------------
            | Auth
            |--------------------------------------------------------------------------
            */
            authGuard,
            authModel,
            /*
            |--------------------------------------------------------------------------
            | Lang
            |--------------------------------------------------------------------------
            */
            title,
            breadcrumbs: Utils.generateBreadCrumbs(title).join(','),
            sentenceName,
            download: Utils.toSnakeCase(data.module),
            /*
            |--------------------------------------------------------------------------
            | Script
            |--------------------------------------------------------------------------
            */
            scriptImport: Utils.excludeFirstPath(namespace).join('/'),
            /*
            |--------------------------------------------------------------------------
            | Route
            |--------------------------------------------------------------------------
            */
            routeFile: Utils.excludeLastPath(namespace),
            /*
            |--------------------------------------------------------------------------
            | Snake
            |--------------------------------------------------------------------------
            */
            snake: Utils.toSnakeCase(module),
            modelSnake: Utils.toSnakeCase(model),
        };
    }
}
