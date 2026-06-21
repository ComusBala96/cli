import { toPascalCase } from '../../utils/functions/functions.mjs';

export function getTableViewMarkup(res) {
    let name = toPascalCase(res?.name?.toLowerCase());
    let namespace = res?.namespace?.toLowerCase();
    let arr = namespace.split('/');
    return `@extends("${arr[0]}.layouts.${arr[0]}_layout", ["title" => __($data["lang"] . ".title")])
@section("breadcrumbs")
    @include("${arr[0]}.common.bread.breadcrumbs", ["breadcrumbs" => __($data["lang"] . ".breadcrumbs")])
@endsection

@section("pages")
    <div class="w-full">
        <div class="rounded-md bg-white shadow-md dark:bg-gray-800">
            <div id="defaultPage" class="pages">
                <div class="m-4 flex flex-wrap justify-end gap-2 whitespace-nowrap text-sm">
                    @if (count($data["items"]) > 0)
                        <button data-pdf-op='{"file_name":"{{ config("meta.host") . __($data["lang"] . ".text.download") }}"}' id="download${name}Pdf" class="flex items-center rounded-md bg-teal-500 px-3 py-1 text-white hover:bg-teal-600"><i class="fa fa-file-pdf"></i><span class="ml-1">{{ __("buttons.pdf") }}</span></button>
                        <button data-excel-op='{"file_name":"{{ config("meta.host") . __($data["lang"] . ".text.download") }}"}' id="download${name}Excel" class="flex items-center rounded-md bg-indigo-500 px-3 py-1 text-white hover:bg-indigo-600"><i class="fa fa-file-export"></i><span class="ml-1">{{ __("buttons.excel") }}</span></button>
                    @endif
                </div>
                <div class="dark:bg-gray-900">
                    <h2 class="text-center text-xl font-bold uppercase text-gray-900 dark:text-gray-100">{{ __($data["lang"] . ".text.title") }}</h2>
                    <hr class="my-2 border-gray-300 dark:border-gray-600">
                    <div class="relative mt-2 p-2 md:p-4">
                        @if (count($data["items"]) > 0)
                            @include("common.views.selected_show")
                            @include("common.views.pdf.layout", ["docTitle" => __($data["lang"] . ".text.title")])
                            <div class="text-xs">
                                <table id="dt${name}" class="table-bordered table-striped w-[99%]"></table>
                            </div>                        
                        @else
                            @include("common.views.no_data_found", ["button" => ""])
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection`;
}
