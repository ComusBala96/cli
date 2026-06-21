import { joinBackSlash, toPascalCase } from "../../utils/functions/functions.mjs";

export function useProvider(res) {
    let space = joinBackSlash(res?.namespace?.toLowerCase());
    let name = toPascalCase(res?.name?.toLowerCase());
    return `use App\\Repositories\\${space}\\${name}Repository;
use App\\Repositories\\${space}\\${name}Interface;`
}
export function bindingProvider(res) {
    let name = toPascalCase(res?.name?.toLowerCase());
    return `$this->app->bind(abstract: ${name}Interface::class, concrete: ${name}Repository::class);`
}