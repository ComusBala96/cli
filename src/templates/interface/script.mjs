import { toPascalCase } from "../../utils/functions/functions.mjs";

export function getInterfaceJavaScript(res) {
    let namespace = res?.namespace?.toLowerCase();
    let name = toPascalCase(res?.name?.toLowerCase());
    return `import { App, Config, Guard, Lang } from '@orians/core';
    
    export default function () {
        $(function () {
            const lang = Lang.pageLang;
            const { placeholder } = lang;
            if (Guard.domElement('frmUpdate${name}')) {
                const rules = {
                    name: {
                        required: true,
                        maxlength: 253,
                    },
                };
                App.update({
                    element: 'frmUpdate${name}',
                    validation: true,
                    url: '${namespace}/update',
                    rules: rules,
                });
            }
        });
    }`
}