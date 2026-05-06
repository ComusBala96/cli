import { bindingScript } from "../../templates/crud/script.mjs";
import { getTableJavaScript } from "../../templates/table/script.mjs";
import { js } from "../definitions/definitions.mjs";
import { createDir, createFile, fileExits, getFile, getFirstString, getLastString, getPath, updateFile } from "../functions/functions.mjs";

export function createTableScript(res) {
    let namespace = res?.namespace;
    let path = getPath(res, 'script');
    let name = getLastString(namespace)?.toLowerCase();
    let ext = js;
    let data = getTableJavaScript(res);
    if (!fileExits(path + name + ext)) {
        createDir(path);
        createFile(getFile(path, name, ext), data);
        console.log(name + ' Script Created Successfully');
    } else {
        console.log(name + ' Script Already Exists');
    }
    let importPath = getPath(res, 'import');
    let fileName = getFirstString(namespace)?.toLowerCase()
    let file = getFile(importPath, fileName, ext);
    updateFile(file, (err, data) => {
        const bindPattern = /\/\/bind\s*\n/;
        const bindInsert = `//bind\n    ${bindingScript(res)}\n`;
        if (!data.includes(bindInsert)) {
            data = data.replace(bindPattern, bindInsert);
            createFile(file, data);
            console.log(fileName + ' Script Bindings Updated Successfully');
        } else {
            console.log(fileName + ' Script Bindings Already Exists');
        }
    })
}
