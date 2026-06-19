import { joinBackSlash, toPascalCase } from "../../utils/functions/functions.mjs";

export function getInterfaceRoute(res) {
    let namespace = res?.namespace.toLowerCase();
    let space = joinBackSlash(namespace);
    let name = toPascalCase(res?.name.toLowerCase());
    return `<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\${space}\\${name}GetController;
use App\\Http\\Controllers\\${space}\\${name}PostController;

Route::get('${namespace}', [${name}GetController::class, 'view${name}']);
Route::post('${namespace}/update', [${name}PostController::class, 'update']);`
}