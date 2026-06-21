import { excludeFirstPath, toPascalCase } from "../../utils/functions/functions.mjs";

export function getJavaScript(res) {
    let namespace = res?.namespace?.toLowerCase();
    let name = toPascalCase(res?.name?.toLowerCase());
    return `import { App, Config, Guard, Lang } from '@orians/core';
    
    export default function () {
        $(function () {
            const lang = Lang.pageLang;
            const { placeholder } = lang;
            if (Guard.domElement('frmCreate${name}')) {
                const rules = {
                    name: {
                        required: true,
                        maxlength: 253,
                    },
                };
                App.create({
                    element: 'frmCreate${name}',
                    validation: true,
                    url: '${namespace}/create',
                    rules: rules,
                });
            }
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
    
            if (Guard.domElement('dt${name}')) {
                const lang = Lang.pageLang;
                const { table } = lang;
                let col_draft = [
                    {
                        data: 'id',
                        title: table?.col?.id,
                        name: 'id',
                    },
                    {
                        data: null,
                        title: table?.col?.serial,
                        name: 'serial',
                        render: function (data, type, row) {
                            return \`<input type="number" value="\${data.serial}" data-name="serial" class="pl-2 py-1 border border-body-dark-blue bg-white text-black focus:outline-none rounded-sm serial z-999">
                                    <input type="hidden" value="\${data.id}" data-name="ids" class="ids">\`;
                        },
                    },
                    {
                        data: 'name',
                        title: table?.col?.name,
                        name: 'name',
                    },
                    {
                        data: 'created_at',
                        title: table?.col?.created_at,
                        name: 'created_at',
                    },
                    {
                        data: null,
                        title: table?.col?.action,
                        render: function (data, type, row) {
                            return \`<a href="\${Config.app_url}${namespace}/edit/\${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-edit"></i></span></a>\`;
                        },
                    },
                ];
                App.table({
                    element: 'dt${name}',
                    select: true,
                    url: '${namespace}/list',
                    columns: col_draft,
                    plugins: { dataTable: true },
                    pdf: [0, 2, 3],
                })
                    .bulkUpdate({
                        element: 'updateAll${name}',
                        url: '${namespace}/table/update',
                        updateCols: true,
                    })
                    .bulkDelete({
                        element: 'deleteAll${name}',
                        url: '${namespace}/table/delete',
                    })
                    .downloadPdf({ btn: 'download${name}Pdf', dataTable: true })
                    .downloadExcel({ btn: 'download${name}Excel', dataTable: true });
            }
        });
    }`
}

export function bindingScript(res) {
    let namespace = res?.namespace?.toLowerCase();
    let name = excludeFirstPath(namespace).join('/');
    return `Route.custom(['${namespace}', '${namespace}/edit/{uuid}'], () => import('./${name}')),`
}