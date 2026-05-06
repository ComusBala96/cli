import fg from 'fast-glob';
import path from 'node:path';
import { cwd } from './file.js';

export interface OriansManifest {
    pages: Record<string, string>;
    modules: Record<string, string>;
    resources: Record<string, string>;
    schemas: Record<string, string>;
}

function normalize(file: string): string {
    return file.replace(/\\/g, '/');
}

function keyFrom(file: string, base: string): string {
    const rel = normalize(path.relative(base, file));
    return rel.replace(/\.(ts|js)$/, '');
}

export async function buildManifest(): Promise<OriansManifest> {
    const pagesBase = cwd('resources/ts/pages');
    const modulesBase = cwd('resources/ts/modules');
    const resourcesBase = cwd('resources/ts/resources');
    const schemasBase = cwd('resources/ts/schemas');

    const pages = await fg(`${pagesBase}/**/*.{ts,js}`);
    const modules = await fg(`${modulesBase}/**/index.{ts,js}`);
    const resources = await fg(`${resourcesBase}/**/*.resource.{ts,js}`);
    const schemas = await fg(`${schemasBase}/**/*.schema.{ts,js}`);

    return {
        pages: Object.fromEntries(pages.map((file) => [keyFrom(file, pagesBase), normalize(file)])),
        modules: Object.fromEntries(modules.map((file) => [keyFrom(path.dirname(file), modulesBase), normalize(file)])),
        resources: Object.fromEntries(resources.map((file) => [keyFrom(file, resourcesBase), normalize(file)])),
        schemas: Object.fromEntries(schemas.map((file) => [keyFrom(file, schemasBase), normalize(file)])),
    };
}
