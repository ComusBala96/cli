import { joinBackSlash, toPascalCase } from "../../utils/functions/functions.mjs";

export function getTableRoute(res) {
    let namespace = res?.namespace.toLowerCase();
    let space = joinBackSlash(namespace);
    let name = toPascalCase(res?.name.toLowerCase());
    return `<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\${space}\\${name}ApiController;
use App\\Http\\Controllers\\${space}\\${name}GetController;

Route::get('${namespace}', [${name}GetController::class, 'view${name}']);
Route::get('${namespace}/view/{uuid}', [${name}GetController::class, 'view${name}']);
Route::post('${namespace}/list', [${name}ApiController::class, 'list']);`
}