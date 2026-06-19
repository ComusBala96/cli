import { joinBackSlash, toPascalCase, toSnakeCase } from "../../utils/functions/functions.mjs";

export function getIRepo(res) {
    let space = joinBackSlash(res?.namespace?.toLowerCase());
    let name = toPascalCase(res?.name?.toLowerCase());
    return `<?php

namespace App\\Repositories\\${space};

interface I${name}Repository
{
    public function list($model, $request);

    public function create($request, $data);

    public function delete($request);

    public function update($request);

    public function updateRow($request);
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
use App\\Repositories\\${space}\\I${name}Repository;
use App\\Http\\Requests\\${space}\\ValidateUpdate${name};

class ${name}Repository extends BaseRepository implements I${name}Repository
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
        try {
            $m = new ${model}();
            $m->uuid = (string)Uuid::generate(4);
            $m->serial = $this->facSrWc($this->${model});
            $m->name = $request->name;
            $m->save();

            $response['extraData'] = [
                'inflate' => 'Added successfully'
            ];
            return $this->response(['type' => 'success', 'data' => $response]);
        } catch (\\Exception $e) {
            $this->saveError($this->getSystemError(['name' => '${toSnakeCase(name)}_store_error']), $e);
            return $this->response(['type' => 'wrong', 'lang' => 'server_wrong']);
        }
    }

    public function update($request)
    {
        $row = ${model}::select('*')->where('uuid', '=', $request->uuid)->first();
        if (empty($row)) {
            return $this->response(['type' => 'noUpdate', 'title' => '<span class="text-danger"> Item not found, try again</span>']);
        }
        $row->name = $request->name;
        if ($row->isDirty()) {
            $validator = Validator::make($request->all(), (new ValidateUpdate${name}())->rules($row));
            if ($validator->fails()) {
                return $this->response(['type' => 'validation', 'errors' => $validator->errors()]);
            }
            try {
                $row->save();
                $data['extraData'] = [
                    'inflate' => 'Updated successfully'
                ];
                return $this->response(['type' => 'success', 'data' => $data]);
            } catch (\\Exception $e) {
                $this->saveError($this->getSystemError(['name' => '${toSnakeCase(name)}_update_error']), $e);
                return $this->response(['type' => 'wrong', 'lang' => 'server_wrong']);
            }
        } else {
            return $this->response(['type' => 'noUpdate', 'title' => '<span class="text-success">You made no changes</span>']);
        }
    }

    public function delete($request)
    {
        $errors = [];
        $i = ${model}::select('id')->whereIn('id', $request->ids)->get();
        if (count($i) > 0) {
            // $errors = $this->checkInUse([
            //     'rows' => $i,
            //     'search' => ['id', 'id', 'id', 'id', 'id'],
            //     'denied' => ['name', 'name', 'name', 'name', 'name'],
            //     'targetModel' => [$this->LibSessionClass, $this->LibClassCategory, $this->LibClassShift, $this->LibClassSection, $this->LibClassGroup],
            //     'targetCol' => ['lib_class_id', 'lib_class_id', 'lib_class_id', 'lib_class_id', 'lib_class_id'],
            //     'exists' => ['Class', 'Class', 'Class', 'Class', 'Class'],
            //     'in' => ['Session Class', 'Category', 'Shift', 'Section', 'Group']
            // ]);
            if (count($errors) > 0) {
                return $this->response(['type' => 'bigError', 'errors' => $errors]);
            }
            foreach ($i as $key => $value) {
                $value->delete();
            }
            $data['extraData'] = [
                'inflate' => 'Deleted successfully',
                'redirect' => null
            ];
            return $this->response(['type' => 'success', 'data' => $data]);
        } else {
            return $this->response(['type' => 'noUpdate', 'title' => 'Something went wrong, try again']);
        }
    }

    public function updateRow($request)
    {
        $i = ${model}::select('id', 'serial')->whereIn('id', $request->ids)->get();
        $dirty = [];
        if (count($i) > 0) {
            foreach ($i as $key => $value) {
                $value->serial = $request->serial[$value->id];
                if ($value->isDirty()) {
                    $dirty[$key] = 'yes';
                }
            }
            if (count($dirty) > 0) {
                foreach ($i as $key => $value) {
                    $value->save();
                }
                $data['extraData'] = [
                    'inflate' => 'Updated successfully'
                ];
                return $this->response(['type' => 'success', 'data' => $data]);
            } else {
                return $this->response(['type' => 'noUpdate', 'title' => '<span class="text-success"> You made no changes </span>']);
            }
        } else {
            return $this->response(['type' => 'noUpdate', 'title' => 'Something went wrong, try again']);
        }
    }
}`
}