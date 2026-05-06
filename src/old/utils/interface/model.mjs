import { getModel } from "../../templates/crud/model.mjs";
import { php } from "../definitions/definitions.mjs";
import { createFile, fileExits, getFile, getPath, toPascalCase } from "../functions/functions.mjs";

export function createInterfaceModel(res) {
    let path = getPath(res, 'model');
    let name = toPascalCase(res?.model);
    let ext = php;
    let data = getModel(res);
    if (!fileExits(path + name + ext)) {
        createFile(getFile(path, name, ext), data);
        console.log('Model ' + name + ' Created Successfully');
    } else {
        console.log('Model ' + name + ' Already Exists');
    }
}
