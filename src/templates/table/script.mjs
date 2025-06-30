import { toPascalCase } from "../../utils/functions/functions.mjs";

export function getTableJavaScript(res) {
    let namespace = res?.namespace?.toLowerCase();
    let name = toPascalCase(res?.name?.toLowerCase());
    return `import { ajaxRequest, domain_url, downloadExcel, downloadPdf, G, makeAjaxDataTable } from '@orian/utils';
    
    $(document).ready(function () {    
        if ($('#dt${name}').length > 0) {
            const lang = G.pageLang;
            const {table} = lang;
            let col_draft = [
                {
                    data: 'id',
                    title: table?.col?.id,
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
                        return \`<a href="\${domain_url}${namespace}/view/\${data.uuid}"><span class="p-2 rounded-full shadow-md text-white" style="background-color:#2edcdc;"><i class="fa fa-eye"></i></span></a>\`;
                    },
                },
            ];
            makeAjaxDataTable('dt${name}', {
                select: false,
                url: '${namespace}/list',
                body: { type: $('#list_type').val() ?? '' },
                columns: col_draft,
                pdf: [0, 1, 2],
            });
        }
    });
    
    window.dt${name} = (table, api, op) => {
        downloadPdf({ ...op, btn: 'download${name}Pdf', dataTable: 'yes' });
        downloadExcel({ ...op, btn: 'download${name}Excel', dataTable: 'yes' });
    }`
}