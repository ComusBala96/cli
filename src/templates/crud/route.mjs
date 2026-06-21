import { joinBackSlash, toPascalCase } from "../../utils/functions/functions.mjs";

export function getRoute(res) {
    let namespace = res?.namespace.toLowerCase();
    let space = joinBackSlash(namespace);
    let name = toPascalCase(res?.name);
    return `<?php

use Illuminate\\Support\\Facades\\Route;
use App\\Http\\Controllers\\${space}\\${name}ApiController;
use App\\Http\\Controllers\\${space}\\${name}GetController;
use App\\Http\\Controllers\\${space}\\${name}PostController;

Route::get('${namespace}', [${name}GetController::class, 'view${name}']);
Route::get('${namespace}/edit/{uuid}', [${name}GetController::class, 'view${name}']);
Route::post('${namespace}/list', [${name}ApiController::class, 'list']);
Route::post('${namespace}/create', [${name}PostController::class, 'create']);
Route::post('${namespace}/update', [${name}PostController::class, 'update']);
Route::post('${namespace}/table/update', [${name}PostController::class, 'updateTable']);
Route::post('${namespace}/table/delete', [${name}PostController::class, 'deleteTable']);`
}