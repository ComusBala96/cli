import { joinBackSlash, convertToDotPath, toPascalCase } from "../../utils/functions/functions.mjs";

export function getInterfaceController(res) {
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
            '${arr[0] == 'admin' ? 'auth:admin' : 'auth:web'}',
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
        $data['item'] = ${model}::select('*')->first();
        $data['lang'] = $this->lang;
        return view('${view}.view${name}')->with('data', $data);
    }
}`
}
export function postInterfaceController(res) {
    let space = joinBackSlash(res?.namespace?.toLowerCase());
    let name = toPascalCase(res?.name?.toLowerCase());
    return `<?php

namespace App\\Http\\Controllers\\${space};

use App\\Traits\\BaseTrait;
use Illuminate\\Http\\Request;
use App\\Http\\Controllers\\Controller;
use App\\Repositories\\${space}\\${name}Interface;
use App\\Http\\Requests\\${space}\\ValidateCreate${name};

class ${name}PostController extends Controller
{
    use BaseTrait;

    public function __construct(private ${name}Interface $${name}Interface)
    {
        $this->LoadModels(['User']);
    }

    public function update(Request $request)
    {
        return $this->${name}Interface->update($request);
    }
}`
}