import { Utils } from '../utils/Utils.mjs';

export class ContextBuilder {
    static build(data) {
        const namespace = data?.namespace;
        const module = data?.module;
        const model = data?.model;
        const route = data?.route.toLowerCase();
        const space = Utils.joinBackSlash(namespace);
        const firstPath = Utils.getFirstPath(namespace.toLowerCase());
        const guard = firstPath === 'admin' ? 'admin' : firstPath === 'user' ? 'web' : firstPath;
        const auth = firstPath === 'admin' ? 'Admin' : firstPath.toUpperCase();
        const pagePath = Utils.addPage(namespace.toLowerCase());
        const view = Utils.convertPath(pagePath, '/', '.');
        const lang = namespace.toLowerCase();
        const title = Utils.convertPath(namespace, '/', ' | ');
        const name = Utils.toSentenceCase(module, ' ');
        const name_lower = Utils.toSentenceCase(module, ' ');
        const breadcrumbs = Utils.generateBreadCrumbs(route, firstPath);
        const download = Utils.toSnakeCase(module);
        const table = Utils.tableName(model);
        const snake = Utils.toSnakeCase(module);
        const scriptPath = Utils.excludeFirstPath(namespace);
        const migrationFile = Utils.migrationFile(model);
        const scriptRoutePath = Utils.excludeLastPath(Utils.excludeLastPath(pagePath));
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
            migrationFile,
            scriptRoutePath,
        };
    }
}
