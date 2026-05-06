import { getInterfaceMigration } from "../../templates/interface/migration.mjs";
import { php } from "../definitions/definitions.mjs";
import { createFile, getFile, getMigrationFile, getPath, migrationExits } from "../functions/functions.mjs";

export function createInterfaceMigration(res) {
    let path = getPath(res, 'migration');
    let ext = php;
    let name = getMigrationFile(res);
    let data = getInterfaceMigration(res);
    if (!migrationExits(path, res)) {
        createFile(getFile(path, name, ext), data);
        console.log('Migration ' + name + ' Created Successfully');
    } else {
        console.log('Migration ' + name + ' Already Exists');
    }
}