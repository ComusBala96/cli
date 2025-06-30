import { getMigration } from "../../templates/crud/migration.mjs";
import { php } from "../definitions/definitions.mjs";
import { createFile, getFile, getMigrationFile, getPath, migrationExits } from "../functions/functions.mjs";

export function createCrudMigration(res) {
    let path = getPath(res, 'migration');
    let ext = php;
    let name = getMigrationFile(res);
    let data = getMigration(res);
    if (!migrationExits(path, res)) {
        createFile(getFile(path, name, ext), data);
        console.log('Migration ' + name + ' Created Successfully');
    } else {
        console.log('Migration ' + name + ' Already Exists');
    }
}