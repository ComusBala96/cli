import { getInterfaceIRepo, getInterfaceRepo } from "../../templates/interface/repository.mjs";
import { php } from "../definitions/definitions.mjs";
import { createDir, createFile, fileExits, getFile, getPath, toPascalCase } from "../functions/functions.mjs";

export function createInterfaceRepo(res) {
    let path = getPath(res, 'repository');
    let ext = php;
    let IName = 'I' + toPascalCase(res?.name?.toLowerCase()) + 'Repository';
    let IData = getInterfaceIRepo(res);
    if (!fileExits(path + IName + ext)) {
        createDir(path);
        createFile(getFile(path, IName, ext), IData);
        console.log(IName + ' Created Successfully');
    } else {
        console.log(IName + ' Already Exists');
    }
    let name = toPascalCase(res?.name?.toLowerCase()) + 'Repository';
    let data = getInterfaceRepo(res);
    if (!fileExits(path + name + ext)) {
        createDir(path);
        createFile(getFile(path, name, ext), data);
        console.log(name + ' Created Successfully');
    } else {
        console.log(name + ' Already Exists');
    }
}
