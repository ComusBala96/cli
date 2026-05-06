import fs from 'fs';
import path from 'path';
import pluralize from 'pluralize';
import { controllerDir, langDir, migrationDir, modelDir, providerDir, repositoryDir, requestDir, routeDir, scriptDir, viewDir, webDir } from '../definitions/definitions.mjs';

export const getProjectsDir = () => {
    const files = fs.readdirSync(webDir, { withFileTypes: true });
    return files.filter(dir => dir.isDirectory()).map(dir => dir.name);
}
export function getPath(res, type) {
    let projectDir = path.join(webDir + res?.project?.toLowerCase() + '/')
    let namespace = res?.namespace;
    switch (type) {
        case 'route':
            return path.join(projectDir + routeDir + namespace?.toLowerCase() + '/');
        case 'model':
            return path.join(projectDir + modelDir);
        case 'migration':
            return path.join(projectDir + migrationDir);
        case 'view':
            return path.join(projectDir + viewDir + addPagePath(res) + '/');
        case 'includes':
            return path.join(projectDir + viewDir + addPagePath(res) + '/' + type + '/');
        case 'controller':
            return path.join(projectDir + controllerDir + toCapitalize(namespace) + '/');
        case 'request':
            return path.join(projectDir + requestDir + toCapitalize(namespace) + '/');
        case 'lang':
            return path.join(projectDir + langDir + excludeLastPath(namespace?.toLowerCase()) + '/');
        case 'repository':
            return path.join(projectDir + repositoryDir + toCapitalize(namespace) + '/');
        case 'provider':
            return path.join(projectDir + providerDir);
        case 'script':
            return path.join(scriptDir + excludeLastPath(namespace?.toLowerCase()) + '/');
        case 'import':
            return path.join(scriptDir + getFirstString(namespace)?.toLowerCase() + '/');
    }
}
export function fileExits(path) {
    return fs.existsSync(path);
}
export function migrationExits(path, res) {
    const files = fs.readdirSync(path);
    return files.some(file => file.includes(`_create_${pluralize(res?.model?.toLowerCase())}_table.php`));
}
export function createDir(path) {
    fs.mkdirSync(path, { recursive: true });
}
export function getFile(path, name, ext) {
    return path + '/' + name + ext;
}
export function createFile(file, data) {
    fs.writeFileSync(file, data, 'utf-8');
}
export function updateFile(file, callback = undefined) {
    fs.readFile(file, 'utf8', (err, data) => {
        callback(err, data);
    });
}
export function getFirstString(str) {
    let arr = str?.split("/");
    return toCapitalize(arr[0]?.toLowerCase());
}
export function getLastString(str) {
    return str?.split("/").pop()
}
export function toCamelCase(str) {
    return str
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase())
        .replace(/^./, c => c.toLowerCase());
}
export function toCapitalize(str) {
    return str?.split('/').map(word =>
        word?.charAt(0).toUpperCase() + word?.slice(1)
    ).join('/');
}
export function toSentenceCase(namespace, separator) {
    let arr = namespace?.startsWith("admin/") ? excludeFirstPath(namespace) : namespace?.split('/');
    return arr?.join(separator);
}
export function toPascalCase(str) {
    return str
      .split(/[^a-zA-Z0-9]/)
      .filter(Boolean)       
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }
  export function toSnakeCase(str) {
    return str
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/([a-z0-9])([A-Z])/g, '$1_$2')
    .toLowerCase();
  }

export function joinBackSlash(str) {
    return str?.split('/')?.map(word =>
        word?.charAt(0)?.toUpperCase() + word?.slice(1)
    ).join('\\');
}
export function getMigrationFile(res) {
    let table = pluralize(toSnakeCase(res?.model?.toLowerCase()));
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}_${month}_${day}_${hours}${minutes}${seconds}_create_${table}_table`;
}
export function addPagePath(res) {
    let path = res?.namespace?.toLowerCase()?.split('/');
    path?.splice(1, 0, 'pages');
    return path?.join('/');
}
export function addViewName(res) {
    return 'view' + toPascalCase(res?.name?.toLowerCase());
}
export function convertToDotPath(str) {
    let arr = str?.split('/');
    arr.splice(1, 0, 'pages');
    return arr?.join('.');
}
export function excludeLastPath(str) {
    return str?.split('/').slice(0, -1).join('/');
}
export function excludeFirstPath(str) {
    return str?.split('/').splice(1);
}
export function generateBreadCrumbs(path) {
    const segments = path?.split('/');
    const breadcrumbs = [];
    segments?.forEach((segment, index) => {
        const key = `b${index + 1}`;
        let url = index === 0 ? "admin/dashboard" : "";
        if (index === segments?.length - 1 && index !== 0) {
            url = "admin/" + segments?.slice(1).map(s => s.toLowerCase()).join('/');
        }
        breadcrumbs[index] = `\n        '${key}' => [\n            'name' => '${segment}',\n            'url' => '${url}'\n        ]`;
    });
    return breadcrumbs;
}








