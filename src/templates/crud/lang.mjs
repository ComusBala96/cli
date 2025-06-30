import { generateBreadCrumbs, toSentenceCase, toCapitalize, toSnakeCase } from "../../utils/functions/functions.mjs";

export function getLang(res) {
    let capName = toCapitalize(res?.namespace?.toLowerCase());
    let title = capName.split('/').join(' |  ');
    let download = toSnakeCase(res?.name?.toLowerCase());
    let breadcrumbs = generateBreadCrumbs(capName);
    let name = toSentenceCase(toCapitalize(res?.name?.toLowerCase()), ' ');
    return `<?php

return [
    'title' => '${title}',
    'breadcrumbs' => [${breadcrumbs}\n    ],
    'text' => [
        'download' => '_${download}_list',
        'title' => '${name} List',
    ],
    'label' => [
        'name' => '${name}',
    ],
    'placeholder' => [
        'name' => 'Enter ${name.toLowerCase()} name',
    ],
    'btns' => [
        'add' => 'Add New ${name}',
        'update' => 'Update ${name}',
    ],
    'table' => [
        'col' => [
            'id' => 'ID',
            'serial' => 'Serial',
            'name' => '${name}',
            'created_at' => 'Created',
            'action' => 'Actions'
        ]
    ]
];`
}

