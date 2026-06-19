import { getUpdateRequest } from "../../templates/crud/request.mjs";
import { getInterfaceCreateRequest } from "../../templates/interface/request.mjs";
import { php } from "../definitions/definitions.mjs";
import { createDir, createFile, fileExits, getFile, getPath, toPascalCase } from "../functions/functions.mjs";

export function createInterfaceRequest(res) {
    let path = getPath(res, 'request');
    let ext = php;
    let createName = 'ValidateCreate' + toPascalCase(res?.name?.toLowerCase());
    let createData = getInterfaceCreateRequest(res);
    if (!fileExits(path + createName + ext)) {
        createDir(path);
        createFile(getFile(path, createName, ext), createData);
        console.log(createName + ' Request Created Successfully');
    } else {
        console.log(createName + ' Request Already Exists');
    }
    let updateName = 'ValidateUpdate' + toPascalCase(res?.name?.toLowerCase());
    let updateData = getUpdateRequest(res);
    if (!fileExits(path + updateName + ext)) {
        createDir(path);
        createFile(getFile(path, updateName, ext), updateData);
        console.log(updateName + ' Request Created Successfully');
    } else {
        console.log(updateName + ' Request Already Exists');
    }
}
