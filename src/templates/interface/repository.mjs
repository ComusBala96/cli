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
use App\\Repositories\\${space}\\${name}Interface;
use App\\Http\\Requests\\${space}\\ValidateCreate${name};
use App\\Http\\Requests\\${space}\\ValidateUpdate${name};

class ${name}Repository extends BaseRepository implements ${name}Interface
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
                return $this->failed(['errors' => $validator->errors()]);
            }
            return self::try(function() use($request) {
                $m = new ${model}();
                $m->uuid = (string)Uuid::generate(4);
                $m->name = $request->name;
                $m->save();

                $data = [
                    'message' => 'Added successfully'
                ];
                return $this->success($data);
            })->catch(['name' => '${toSnakeCase(name)}_store']);
        }
        $row->name = $request->name;
        if ($row->isDirty()) {
            $validator = Validator::make($request->all(), (new ValidateUpdate${name}())->rules($row));
            if ($validator->fails()) {
                return $this->failed(['errors' => $validator->errors()]);
            }
            return self::try(function() use($row) {
                $row->save();
                $data = [
                    'message' => 'Updated successfully'
                ];
                return $this->success($data);
            })->catch(['name' => '${toSnakeCase(name)}_update_error']);
        } else {
            return $this->noChange();
        }
    }
}`
}