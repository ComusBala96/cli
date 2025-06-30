import { createInterfaceController } from "./controller.mjs";
import { createInterfaceLang } from "./lang.mjs";
import { createInterfaceMigration } from "./migration.mjs";
import { createInterfaceModel } from "./model.mjs";
import { updateInterfaceProvider } from "./provider.mjs";
import { createInterfaceRepo } from "./repository.mjs";
import { createInterfaceRequest } from "./request.mjs";
import { createInterfaceRoute } from "./route.mjs";
import { createInterfaceScript } from "./script.mjs";
import { createInterfaceViews } from "./view.mjs";

export function createInterface(res) {
    createInterfaceRoute(res);
    createInterfaceModel(res);
    createInterfaceMigration(res);
    createInterfaceViews(res);
    createInterfaceController(res);
    createInterfaceRequest(res);
    createInterfaceLang(res);
    createInterfaceRepo(res);
    updateInterfaceProvider(res);
    createInterfaceScript(res);
}