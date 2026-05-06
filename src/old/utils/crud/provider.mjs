import { bindingProvider, useProvider } from "../../templates/crud/provider.mjs";
import { php } from "../definitions/definitions.mjs";
import { createFile, getFile, getPath, updateFile } from "../functions/functions.mjs";

export function updateCrudProvider(res) {
    let path = getPath(res, 'provider');
    let name = 'RepositoryServiceProvider'
    let ext = php;
    let file = getFile(path, name, ext);
    updateFile(file, (err, data) => {
        const usePattern = /\/\/use\s*\n/;
        const useInsert = `//use\n${useProvider(res)}\n`;
        const bindPattern = /\/\/bind\s*\n/;
        const bindInsert = `//bind \n        ${bindingProvider(res)}\n`;
        if (!data.includes(useInsert) && !data.includes(bindInsert)) {
            data = data.replace(usePattern, useInsert);
            data = data.replace(bindPattern, bindInsert);
            createFile(file, data);
            console.log(name + ' Use and Bindings Updated Successfully');
        } else {
            console.log(name + 'Use and Bindings Already Exists');
        }
    })
}
