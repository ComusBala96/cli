import { createTableController } from "./controller.mjs";
import { createTableLang } from "./lang.mjs";
import { createTableMigration } from "./migration.mjs";
import { createTableModel } from "./model.mjs";
import { updateTableProvider } from "./provider.mjs";
import { createTableRepo } from "./repository.mjs";
import { createTableRoute } from "./route.mjs";
import { createTableScript } from "./script.mjs";
import { createTableViews } from "./view.mjs";

export function createTable(res) {
    createTableRoute(res);
    createTableModel(res);
    createTableMigration(res);
    createTableViews(res);
    createTableController(res);
    createTableLang(res);
    createTableRepo(res);
    updateTableProvider(res);
    createTableScript(res);
}