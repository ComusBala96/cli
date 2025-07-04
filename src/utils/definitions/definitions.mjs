import { fileURLToPath } from 'url';
import path from 'path';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
export const root = path.resolve(__dirname, '../../../../../');
export const webDir = path.join(root, 'projects/web/');
export const scriptDir = path.join(root, 'packages/application/src/');
export const modelDir = 'App/Models/';
export const migrationDir = 'database/migrations/';
export const routeDir = 'routes/web/';
export const viewDir = 'resources/views/';
export const controllerDir = 'App/Http/Controllers/';
export const requestDir = 'App/Http/Requests/';
export const repositoryDir = 'App/Repositories/';
export const providerDir = 'App/Providers/';
export const langDir = 'resources/lang/en/';
export const php = '.php';
export const blade = '.blade.php';
export const js = '.js';
export const actions = ['create', 'update', 'delete'];
export const operations = ['crud', 'table', 'interface', 'modal'];