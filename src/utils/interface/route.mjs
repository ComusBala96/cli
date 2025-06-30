import { getInterfaceRoute } from "../../templates/interface/route.mjs";
import { php } from "../definitions/definitions.mjs";
import { createDir, createFile, fileExits, getFile, getPath, toCamelCase } from "../functions/functions.mjs";

export function createInterfaceRoute(res) {
    let path = getPath(res, 'route');
    if (!fileExits(path)) {
        createDir(path)
        let name = toCamelCase(res?.name?.toLowerCase());
        let ext = php;
        let data = getInterfaceRoute(res);
        createFile(getFile(path, name.toLowerCase(), ext), data);
        console.log('Route ' + name + ' Created Successfully');
    }
}
