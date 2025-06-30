import { getLang } from "../../templates/crud/lang.mjs";
import { php } from "../definitions/definitions.mjs";
import { createDir, createFile, fileExits, getFile, getLastString, getPath } from "../functions/functions.mjs";

export function createCrudLang(res) {
    let path = getPath(res, 'lang');
    let ext = php;
    let name = getLastString(res?.namespace?.toLowerCase());
    let data = getLang(res);
    if (!fileExits(path + name + ext)) {
        createDir(path);
        createFile(getFile(path, name, ext), data);
        console.log(name + ' Language Created Successfully');
    } else {
        console.log(name + ' Language Already Exists');
    }
}
