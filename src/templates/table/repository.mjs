import { joinBackSlash, toPascalCase } from "../../utils/functions/functions.mjs";

export function getTableIRepo(res) {
    let space = joinBackSlash(res?.namespace?.toLowerCase());
    let name = toPascalCase(res?.name?.toLowerCase());
    return `<?php

namespace App\\Repositories\\${space};

interface ${name}Interface
{
    public function list($model, $request);
}`
}
export function getTableRepo(res) {
    let model = toPascalCase(res?.model?.toLowerCase());
    let space = joinBackSlash(res?.namespace?.toLowerCase());
    let name = toPascalCase(res?.name?.toLowerCase());
    return `<?php

namespace App\\Repositories\\${space};

use Carbon\\Carbon;
use App\\Traits\\BaseTrait;
use Yajra\\DataTables\\DataTables;
use App\\Repositories\\BaseRepository;
use App\\Repositories\\${space}\\${name}Interface;

class ${name}Repository extends BaseRepository implements ${name}Interface
{
    use BaseTrait;

    public function __construct()
    {
        $this->LoadModels(['${model}']);
    }

    public function list($model, $request)
    {
        $model = $model::orderBy('serial', 'ASC');
        return DataTables::of($model)
            ->editColumn('created_at', function ($item) {
                return  Carbon::parse($item->created_at)->format('d-m-Y');
            })
            ->make(true);
    }
}`
}