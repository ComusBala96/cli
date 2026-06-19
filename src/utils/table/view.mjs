import { getTableViewMarkup } from "../../templates/table/views.mjs";
import { blade } from "../definitions/definitions.mjs";
import { addViewName, createDir, createFile, fileExits, getFile, getPath } from "../functions/functions.mjs";

export function createTableViews(res) {
    let path = getPath(res, 'view');
    let ext = blade;
    let name = addViewName(res);
    let data = getTableViewMarkup(res);
    if (!fileExits(path + name + ext)) {
        createDir(path);
        createFile(getFile(path, name, ext), data);
        console.log(name + ' Created Successfully');
    } else {
        console.log(name + ' Already Exists');
    }
}
