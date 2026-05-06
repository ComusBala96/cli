import { apiController, getController } from "../../templates/crud/controller.mjs";
import { php } from "../definitions/definitions.mjs";
import { createDir, createFile, fileExits, getFile, getPath, toPascalCase } from "../functions/functions.mjs";

export function createTableController(res) {
    let path = getPath(res, 'controller');
    let ext = php;
    let getName = toPascalCase(res?.name?.toLowerCase()) + 'GetController';
    let getData = getController(res);
    if (!fileExits(path + getName + ext)) {
        createDir(path);
        createFile(getFile(path, getName, ext), getData);
        console.log(getName + ' Created Successfully');
    } else {
        console.log(getName + ' Already Exists');
    }
    let apiName = toPascalCase(res?.name?.toLowerCase()) + 'ApiController';
    let apiData = apiController(res);
    if (!fileExits(path + apiName + ext)) {
        createDir(path);
        createFile(getFile(path, apiName, ext), apiData);
        console.log(apiName + ' Created Successfully');
    } else {
        console.log(apiName + ' Already Exists');
    }

}
