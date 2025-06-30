import { joinBackSlash, toPascalCase, toSnakeCase } from "../../utils/functions/functions.mjs";

export function getInterfaceIRepo(res) {
    let space = joinBackSlash(res?.namespace?.toLowerCase());
    let name = toPascalCase(res?.name?.toLowerCase());
    return `<?php

namespace App\\Repositories\\${space};

interface I${name}Repository
{
    public function update($request);
}`
}
export function getInterfaceRepo(res) {
    let model = toPascalCase(res?.model?.toLowerCase());
    let space = joinBackSlash(res?.namespace?.toLowerCase());
    let name = toPascalCase(res?.name?.toLowerCase());
    return `<?php

namespace App\\Repositories\\${space};

use App\\Models\\${model};
use Webpatser\\Uuid\\Uuid;
use App\\Traits\\BaseTrait;
use App\\Repositories\\BaseRepository;
use Illuminate\\Support\\Facades\\Validator;
use App\\Repositories\\${space}\\I${name}Repository;
use App\\Http\\Requests\\${space}\\ValidateCreate${name};
use App\\Http\\Requests\\${space}\\ValidateUpdate${name};

class ${name}Repository extends BaseRepository implements I${name}Repository
{
    use BaseTrait;

    public function __construct()
    {
        $this->LoadModels(['${model}']);
    }

    public function update($request)
    {
        $row = ${model}::select('*')->first();
        if (empty($row)) {
            $validator = Validator::make($request->all(), (new ValidateCreate${name}())->rules());
            if ($validator->fails()) {
                return $this->response(['type' => 'validation', 'errors' => $validator->errors()]);
            }
            try {
                $m = new ${model}();
                $m->uuid = (string)Uuid::generate(4);
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
}`
}