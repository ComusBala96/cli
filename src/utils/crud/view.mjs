import { getAddMarkup, getEditMarkup, getViewMarkup } from "../../templates/crud/views.mjs";
import { blade } from "../definitions/definitions.mjs";
import { addViewName, createDir, createFile, fileExits, getFile, getPath } from "../functions/functions.mjs";

export function createCrudViews(res) {
    let viewPath = getPath(res, 'view');
    let ext = blade;
    let viewName = addViewName(res);
    let viewData = getViewMarkup(res);
    if (!fileExits(viewPath + viewName + ext)) {
        createDir(viewPath);
        createFile(getFile(viewPath, viewName, ext), viewData);
        console.log(viewName + ' Created Successfully');
    } else {
        console.log(viewName + ' Already Exists');
    }
    let pagePath = getPath(res, 'includes');
    let addName = 'viewAdd';
    let addData = getAddMarkup(res);
    if (!fileExits(pagePath + addName + ext)) {
        createDir(pagePath);
        createFile(getFile(pagePath, addName, ext), addData);
        console.log(addName + ' Created Successfully');
    } else {
        console.log(addName + ' Already Exists');
    }
    let editName = 'viewEdit';
    let editData = getEditMarkup(res);
    if (!fileExits(pagePath + editName + ext)) {
        createDir(pagePath);
        createFile(getFile(pagePath, editName, ext), editData);
        console.log(editName + ' Created Successfully');
    } else {
        console.log(editName + ' Already Exists');
    }

}
