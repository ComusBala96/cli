import { getInterfaceController, postInterfaceController } from "../../templates/interface/controller.mjs";
import { php } from "../definitions/definitions.mjs";
import { createDir, createFile, fileExits, getFile, getPath, toPascalCase } from "../functions/functions.mjs";

export function createInterfaceController(res) {
    let path = getPath(res, 'controller');
    let ext = php;
    let getName = toPascalCase(res?.name?.toLowerCase()) + 'GetController';
    let getData = getInterfaceController(res);
    if (!fileExits(path + getName + ext)) {
        createDir(path);
        createFile(getFile(path, getName, ext), getData);
        console.log(getName + ' Created Successfully');
    } else {
        console.log(getName + ' Already Exists');
    }
    let postName = toPascalCase(res?.name?.toLowerCase()) + 'PostController';
    let postData = postInterfaceController(res);
    if (!fileExits(path + postName + ext)) {
        createDir(path);
        createFile(getFile(path, postName, ext), postData);
        console.log(postName + ' Created Successfully');
    } else {
        console.log(postName + ' Already Exists');
    }
}
