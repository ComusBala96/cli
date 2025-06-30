import { toPascalCase } from "../../utils/functions/functions.mjs";

export function getInterfaceJavaScript(res) {
    let namespace = res?.namespace?.toLowerCase();
    let name = toPascalCase(res?.name?.toLowerCase());
    return `import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@orian/utils';
    
    $(document).ready(function () {
        if ($("#frmUpdate${name}").length > 0) {
            let rules = {
                name: {
                    required: true,
                    maxlength: 253
                },
            };
            ajaxRequest({
                element: "frmUpdate${name}",
                validation: true,
                script: "${namespace}/update",
                rules,
                afterSuccess: {
                    type: "inflate_response_data"
                }
            });
        }
    });`
}