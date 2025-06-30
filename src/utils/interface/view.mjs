import { getInterfaceViewMarkup } from "../../templates/interface/views.mjs";
import { blade } from "../definitions/definitions.mjs";
import { addViewName, createDir, createFile, fileExits, getFile, getPath } from "../functions/functions.mjs";

export function createInterfaceViews(res) {
    let viewPath = getPath(res, 'view');
    let ext = blade;
    let viewName = addViewName(res);
    let viewData = getInterfaceViewMarkup(res);
    if (!fileExits(viewPath + viewName + ext)) {
        createDir(viewPath);
        createFile(getFile(viewPath, viewName, ext), viewData);
        console.log(viewName + ' Created Successfully');
    } else {
        console.log(viewName + ' Already Exists');
    }
}
