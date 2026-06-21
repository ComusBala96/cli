import { convertToDotPath, toPascalCase } from "../../utils/functions/functions.mjs";

export function getViewMarkup(res) {
    let view = convertToDotPath(res?.namespace?.toLowerCase());
    let name = toPascalCase(res?.name);
    let namespace = res?.namespace?.toLowerCase();
    let arr = namespace.split('/'); 
    return `@extends("${arr[0]}.layouts.${arr[0]}_layout", ["title" => __($data["lang"] . ".title")])
@section("breadcrumbs")
    @include("${arr[0]}.common.bread.breadcrumbs", ["breadcrumbs" => __($data["lang"] . ".breadcrumbs")])
@endsection

@section("pages")
    <div class="w-full">
        <div class="rounded-md bg-white shadow-md dark:bg-gray-800">
            @if ($data["item"] == null && $data["type"] != "edit")
                <div id="defaultPage" class="pages">
                    <div class="m-4 flex flex-wrap justify-end gap-2 whitespace-nowrap text-sm">
                        <button data-prop='{"page": "addPage","server": "no"}' class="viewAction flex items-center rounded-md bg-blue-500 px-3 py-1 text-white hover:bg-blue-600"><i class="fa fa-plus"></i><span class="ml-1">{{ __("buttons.add") }}</span></button>
                        @if (count($data["items"]) > 0)
                            <button id="updateAll${name}" class="flex items-center rounded-md bg-green-500 px-3 py-1 text-white hover:bg-green-600"><i class="fa fa-save"></i><span class="ml-1">{{ __("buttons.update") }}</span></button>
                            <button id="deleteAll${name}" class="flex items-center rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600"><i class="fa fa-trash"></i><span class="ml-1">{{ __("buttons.delete") }}</span></button>
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
                                @include("common.views.no_data_found")
                            @endif
                        </div>
                    </div>
                </div>
                <div id="addPage" class="pages hidden">
                    @include("${view}.includes.viewAdd")
                </div>
            @else
                <div id="editPage" class="pages">
                    <div class="dark:bg-gray-900">
                        <div id="loadEdit" class="w-full">
                            @include("${view}.includes.viewEdit")
                        </div>
                    </div>
                </div>
            @endif
        </div>
    </div>
@endsection`
}
export function getAddMarkup(res) {
    let name = toPascalCase(res?.name?.toLowerCase());
    let namespace = res?.namespace?.toLowerCase();
    let arr = namespace.split('/');

    return `@include("common.views.add_new_feature", ["base" => $data["base"], "name" => __($data["lang"] . ".btns.add")])
<div class="p-6">
    <form id="frmCreate${name}" autocomplete="off">
        <input type="hidden" name="base" value="{{ $data["base"] }}" />
        <input type="hidden" name="created_by" value="{{ Auth::guard(${arr[0] == 'admin' ? 'admin' : 'web'})->user()->uuid }}" />
        <div class="flex justify-center text-sm">
            <div class="w-full max-w-lg">
                <div class="mb-4">
                    <label class="mb-2 block font-bold text-gray-700 dark:text-gray-300">{{ __($data["lang"] . ".label.name") }} <em class="text-red-500">*</em></label>
                    <input type="text" name="name" id="name" placeholder="{{ __($data["lang"] . ".placeholder.name") }}" class="focus:border-body-yellow w-full rounded border border-gray-300 p-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                    <div id="name_error" class="text-sm text-red-500"></div>
                </div>
                <div class="text-right">
                    <button class="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600">
                        <i class="fa fa-plus"></i> <span>{{ __("buttons.create") }}</span>
                    </button>
                </div>
            </div>
        </div>
    </form>
</div>`
}
export function getEditMarkup(res) {
    let name = toPascalCase(res?.name?.toLowerCase());
    let namespace = res?.namespace?.toLowerCase();
    let arr = namespace.split('/');
    return `@include("common.views.add_new_feature", ["base" => $data["base"], "name" => __($data["lang"] . ".btns.update")])
<div class="p-6">
    <form id="frmUpdate${name}" autocomplete="off">
        <input type="hidden" name="base" value="{{ $data["base"] }}" />
        <input type="hidden" name="uuid" value="{{ $data["item"]->uuid }}" />
        <input type="hidden" name="updated_by" value="{{ Auth::guard(${arr[0] == 'admin' ? 'admin' : 'web'})->user()->uuid }}" />
        <div class="flex justify-center text-sm">
            <div class="w-full max-w-lg">
                <div class="mb-4">
                    <label class="mb-2 block font-bold text-gray-700 dark:text-gray-300">{{ __($data["lang"] . ".label.name") }} <em class="text-red-500">*</em></label>
                    <input type="text" name="name" id="name" placeholder="{{ __($data["lang"] . ".placeholder.name") }}" class="focus:border-body-yellow w-full rounded border border-gray-300 p-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white" value="{{ $data["item"]->name }}">
                    <div id="name_error" class="text-sm text-red-500"></div>
                </div>
                <div class="text-right">
                    <button class="rounded bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600">
                        <i class="fa fa-plus"></i> <span>{{ __("buttons.update") }}</span>
                    </button>
                </div>
            </div>
        </div>
    </form>
</div>`
}