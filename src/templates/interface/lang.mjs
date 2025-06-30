import { toCapitalize, generateBreadCrumbs, toSentenceCase } from "../../utils/functions/functions.mjs";

export function getInterfaceLang(res) {
    let capName = toCapitalize(res?.namespace?.toLowerCase());
    let title = capName.split('/').join(' |  ');
    let breadcrumbs = generateBreadCrumbs(capName);
    let name = toSentenceCase(toCapitalize(res?.name?.toLowerCase()), ' ');
    return `<?php

return [
    'title' => '${title}',
    'breadcrumbs' => [${breadcrumbs}\n    ],
    'text' => [
        'title' => '${name}',
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
];`
}

