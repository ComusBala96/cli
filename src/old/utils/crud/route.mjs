import { getRoute } from "../../templates/crud/route.mjs";
import { php } from "../definitions/definitions.mjs";
import { createDir, createFile, fileExits, getFile, getPath, toCamelCase } from "../functions/functions.mjs";

export function createCrudRoute(res) {
    let path = getPath(res, 'route');
    if (!fileExits(path)) {
        createDir(path)
        let name = toCamelCase(res?.name?.toLowerCase());
        let ext = php;
        let data = getRoute(res);
        createFile(getFile(path, name, ext), data);
        console.log('Route ' + name + ' Created Successfully');
    }
}
