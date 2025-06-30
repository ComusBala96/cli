import { excludeFirstPath, toPascalCase } from "../../utils/functions/functions.mjs";

export function getJavaScript(res) {
    let namespace = res?.namespace?.toLowerCase();
    let name = toPascalCase(res?.name?.toLowerCase());
    return `import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@orian/utils';
    
    $(document).ready(function () {
        if ($('#frmCreate${name}').length > 0) {
            let rules = {
                name: {
                    required: true,
                    maxlength: 253,
                },
            };
            ajaxRequest({
                element: 'frmCreate${name}',
                validation: true,
                script: '${namespace}/create',
                rules,
                afterSuccess: {
                    type: 'inflate_reset_response_data',
                },
            });
        }
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
    
        if ($('#dt${name}').length > 0) {
            const lang = G.pageLang;
            const {table} = lang;
            let col_draft = [
                {
                    data: 'id',
                    title: table?.col?.id,
                },
                {
                    data: null,
                    title: table?.col?.serial,
                    render: function (data, type, row) {
                        return \`<input type="number" value="\${data.serial}" class="pl-2 py-1 border border-body-blue bg-white text-black focus:outline-none rounded-sm serial z-999">
                                <input type="hidden" value="\${data.id}" class="ids">\`;
                    }
                },
                {
                    data: 'name',
                    title: table?.col?.name,
                },
                {
                    data: 'created_at',
                    title: table?.col?.created_at,
                },
                {
                    data: null,
                    title: table?.col?.action,                    
                    render: function (data, type, row) {
                        return \`<a href="\${domain_url}${namespace}/edit/\${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>\`;
                    },
                },
            ];
            makeAjaxDataTable('dt${name}', {
                select: true,
                url: '${namespace}/list',
                columns: col_draft,
                pdf: [0, 2, 3],
            });
        }
    });
    
    window.dt${name} = (table, api, op) => {
        G.deleteAll({
            element: 'deleteAll${name}',
            script: '${namespace}/delete',
            confirm: true,
            api,
        });
        G.updateAll({
            element: "updateAll${name}",
            script: "${namespace}/updateRow",
            confirm: true,
            dataCols: {
                key: "ids",
                items: [
                    {
                        index: 1,
                        name: "ids",
                        type: "input",
                        data: [],
                    },
                    {
                        index: 1,
                        name: "serial",
                        type: "input",
                        data: []
                    }
                ]
            },
            api,
            afterSuccess: {
                type: "inflate_response_data"
            }
        });
        downloadPdf({ ...op, btn: 'download${name}Pdf', dataTable: 'yes' });
        downloadExcel({ ...op, btn: 'download${name}Excel', dataTable: 'yes' });
    }`
}

export function bindingScript(res) {
    let namespace = res?.namespace?.toLowerCase();
    let name = excludeFirstPath(namespace).join('/');
    return `case '${namespace}':
        module = import('./${name}');
        break;`
}