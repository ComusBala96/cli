import { joinBackSlash, toPascalCase, toSnakeCase } from "../../utils/functions/functions.mjs";

export function getIRepo(res) {
    let space = joinBackSlash(res?.namespace?.toLowerCase());
    let name = toPascalCase(res?.name?.toLowerCase());
    return `<?php

namespace App\\Repositories\\${space};

interface ${name}Interface
{
    public function list($model, $request);

    public function create($request, $data);
    
    public function update($request);
    
    public function updateTable($request);

    public function deleteTable($request);
}`
}
export function getRepo(res) {
    let model = toPascalCase(res?.model?.toLowerCase());
    let space = joinBackSlash(res?.namespace?.toLowerCase());
    let name = toPascalCase(res?.name?.toLowerCase());
    return `<?php

namespace App\\Repositories\\${space};

use Carbon\\Carbon;
use App\\Models\\${model};
use Webpatser\\Uuid\\Uuid;
use App\\Traits\\BaseTrait;
use Yajra\\DataTables\\DataTables;
use App\\Repositories\\BaseRepository;
use Illuminate\\Support\\Facades\\Validator;
use App\\Repositories\\${space}\\${name}Interface;
use App\\Http\\Requests\\${space}\\ValidateUpdate${name};

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

    public function create($request, $data)
    {
        return self::try(function () use ($request, $data) {
            $m = new ${model}();
            $m->uuid = (string)Uuid::generate(4);
            $m->serial = $this->getSerial($this->${model});
            $m->name = strtolower($request->name);
            $m->created_by = $data['created_by'];
            $m->save();
            $data = [
                'message' => 'Added successfully',
                'reset' => true
            ];
            return $this->success($data);
        })->catch(['name' => '${toSnakeCase(name)}_store']);
    }

    public function update($request)
    {
        $row = ${model}::select('*')->where('uuid', '=', $request->uuid)->first();
        if (empty($row)) {
            return $this->exists();
        }
        $row->name = strtolower($request->name);
        $row->updated_by = $data['updated_by'];
        if ($row->isDirty()) {
            $validator = Validator::make($request->all(), (new ValidateUpdate${name}())->rules($row));
            if ($validator->fails()) {
                return $this->failed(['errors' => $validator->errors()]);
            }
            return self::try(function () use ($request, $row) {
                $row->save();
                $data = [
                    'message' => 'Updated successfully',
                    'redirect' => $request->base,
                    'reload_table' => true
                ];
                return $this->success($data);
            })->catch(['name' => '${toSnakeCase(name)}_update']);
        } else {
            return $this->noChange();
        }
    }

    public function updateTable($request)
    {
        return self::defaultUpdateTable($request, $this->${model}, ['name' => '${toSnakeCase(name)}_update']);
    }
    
    public function deleteTable($request)
    {
        $errors = [];
        // $errors = $this->checkInUse([
        //     'rows' => $i,
        //     'search' => ['id', 'id'],
        //     'denied' => ['name', 'name', ],
        //     'targetModel' => [$this->User, $this->Permission],
        //     'targetCol' => ['id', 'id'],
        //     'exists' => ['FileSystem', 'FileSystem'],
        //     'in' => ['User', 'Permission']
        // ]);
        // if (count($errors) > 0) {
        //     return $this->bigErrors($errors);
        // }
        return self::defaultDelete($request, $this->${model}, $errors, ['name' => '${toSnakeCase(name)}_delete']);
    }
}`
}