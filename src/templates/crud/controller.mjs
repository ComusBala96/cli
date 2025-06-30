import { convertToDotPath, joinBackSlash, toPascalCase } from "../../utils/functions/functions.mjs";

export function getController(res) {
    let namespace = res?.namespace?.toLowerCase();
    let model = toPascalCase(res?.model?.toLowerCase());
    let space = joinBackSlash(namespace);
    let arr = namespace.split('/');
    let view = convertToDotPath(namespace);
    let name = toPascalCase(res?.name?.toLowerCase());
    return `<?php

namespace App\\Http\\Controllers\\${space};

use App\\Traits\\BaseTrait;
use Illuminate\\Http\\Request;
use App\\Http\\Controllers\\Controller;
use App\\Models\\${model};
use Illuminate\\Routing\\Controllers\\HasMiddleware;

class ${name}GetController extends Controller implements HasMiddleware
{
    use BaseTrait;

    public static function middleware(): array
    {
        return [
            '${arr[0] == 'admin' ? 'auth:web' : ''}',
        ];
    }

    public function __construct()
    {
        $this->lang = '${namespace}';
    }

    public function view${name}(Request $request)
    {
        $data = [];
        $data = getPageDefault('${namespace}', $request);
        if (isset($request->uuid)) {
            $data['item'] = ${model}::select('uuid', 'name')->where('uuid', '=', $request->uuid)->first();
        } else {
            $data['items'] = ${model}::select('uuid')->get()->take(1);
        }
        $data['lang'] = $this->lang;
        return view('${view}.view${name}')->with('data', $data);
    }
}`
}
export function postController(res) {
    let space = joinBackSlash(res?.namespace?.toLowerCase());
    let name = toPascalCase(res?.name?.toLowerCase());
    return `<?php

namespace App\\Http\\Controllers\\${space};

use App\\Traits\\BaseTrait;
use Illuminate\\Http\\Request;
use App\\Http\\Controllers\\Controller;
use App\\Repositories\\${space}\\I${name}Repository;
use App\\Http\\Requests\\${space}\\ValidateCreate${name};

class ${name}PostController extends Controller
{
    use BaseTrait;

    public function __construct(private I${name}Repository $I${name}Repo)
    {
        $this->LoadModels(['User']);
    }

    public function create(ValidateCreate${name} $request)
    {
        $auth = $this->checkExists($request, 'User|uuid|created_by', ['id', 'name']);
        if (empty($auth)) {
            return $this->response(['type' => 'noUpdate', 'title' => 'Item not found']);
        }
        return $this->I${name}Repo->create($request, ['created_by' => $auth->id]);
    }

    public function delete(Request $request)
    {
        return $this->I${name}Repo->delete($request);
    }

    public function update(Request $request)
    {
        return $this->I${name}Repo->update($request);
    }

    public function updateRow(Request $request)
    {
        return $this->I${name}Repo->updateRow($request);
    }
}`
}
export function apiController(res) {
    let model = toPascalCase(res?.model?.toLowerCase());
    let space = joinBackSlash(res?.namespace?.toLowerCase());
    let name = toPascalCase(res?.name?.toLowerCase());
    return `<?php

namespace App\\Http\\Controllers\\${space};

use App\\Traits\\BaseTrait;
use Illuminate\\Http\\Request;
use App\\Http\\Controllers\\Controller;
use App\\Repositories\\${space}\\I${name}Repository;

class ${name}ApiController extends Controller
{
    use BaseTrait;

    public function __construct(private I${name}Repository $I${name}Repo)
    {
        $this->LoadModels(['${model}']);
    }

    public function list(Request $request)
    {
        return $this->I${name}Repo->list($this->${model}, $request);
    }
}`
}