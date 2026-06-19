import { joinBackSlash, toPascalCase } from "../../utils/functions/functions.mjs";

export function getCreateRequest(res) {
    let space = joinBackSlash(res?.namespace?.toLowerCase());
    let name = toPascalCase(res?.name?.toLowerCase());
    return `<?php

namespace App\\Http\\Requests\\${space};

use Illuminate\\Contracts\\Validation\\Validator;
use Illuminate\\Foundation\\Http\\FormRequest;
use Illuminate\\Validation\\ValidationException;

class ValidateCreate${name} extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function message(): array
    {
        return [
        ];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \\Illuminate\\Contracts\\Validation\\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:253',
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        $response = response()->json([
            'success' => false,
            'errors' => $validator->errors(),
        ]);
        throw (new ValidationException($validator, $response))->errorBag($this->errorBag);
    }
}`
}

export function getUpdateRequest(res) {
    let space = joinBackSlash(res?.namespace?.toLowerCase());
    let name = toPascalCase(res?.name?.toLowerCase());
    return `<?php

namespace App\\Http\\Requests\\${space};

use Illuminate\\Foundation\\Http\\FormRequest;

class ValidateUpdate${name} extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function message(): array
    {
        return [
        ];
    }

    public function rules($row): array
    {
        $rules = [];
        if ($row->isDirty('name')) {
            $rules['name'] = 'required|string|max:253';
        }
        return $rules;
    }
}`
}