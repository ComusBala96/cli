import { createCrudRoute } from './route.mjs';
import { createCrudModel } from './model.mjs';
import { createCrudMigration } from './migration.mjs';
import { createCrudViews } from './view.mjs';
import { createCrudController } from './controller.mjs';
import { createCrudRequest } from './request.mjs';
import { createCrudLang } from './lang.mjs';
import { createCrudRepo } from './repository.mjs';
import { updateCrudProvider } from './provider.mjs';
import { createCrudScript } from './script.mjs';

export function createCrud(res) {
    createCrudRoute(res);
    createCrudModel(res);
    createCrudMigration(res);
    createCrudViews(res);
    createCrudController(res);
    createCrudRequest(res);
    createCrudLang(res);
    createCrudRepo(res);
    updateCrudProvider(res);
    createCrudScript(res);
}