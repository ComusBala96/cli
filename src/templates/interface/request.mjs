import { joinBackSlash, toPascalCase } from "../../utils/functions/functions.mjs";

export function getInterfaceCreateRequest(res) {
    let space = joinBackSlash(res?.namespace?.toLowerCase());
    let name = toPascalCase(res?.name?.toLowerCase());
    return `<?php

namespace App\\Http\\Requests\\${space};

use Illuminate\\Foundation\\Http\\FormRequest;

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
}`
}