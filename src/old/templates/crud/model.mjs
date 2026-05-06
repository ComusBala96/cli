import pluralize from "pluralize";
import { toPascalCase, toSnakeCase } from "../../utils/functions/functions.mjs";

export function getModel(res) {
    let model = toPascalCase(res?.model.toLowerCase());
    let table = pluralize(toSnakeCase(res?.model.toLowerCase()));

    return `<?php

namespace App\\Models;

use App\\Traits\\BaseTrait;
use Illuminate\\Database\\Eloquent\\Model;
use Illuminate\\Database\\Eloquent\\Factories\\HasFactory;

class ${model} extends Model
{
    use HasFactory, BaseTrait;
    protected $table = '${table}';
}`
}