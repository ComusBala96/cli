import { toPascalCase } from "../../utils/functions/functions.mjs";

export function getInterfaceViewMarkup(res) {
    let name = toPascalCase(res?.name?.toLowerCase());
    return `@extends("admin.layouts.admin_layout", ["title" => __($data["lang"] . ".title")])
@section("breadcrumbs")
    @include("admin.common.bread.breadcrumbs", ["breadcrumbs" => __($data["lang"] . ".breadcrumbs")])
@endsection

@section("pages")
    <div class="w-full">
        {{-- Include Nav Here If Required --}}
        <div class="w-full text-sm">
            <div class="rounded-md bg-white shadow-md dark:bg-gray-800">
                <div class="px-6 pb-16 md:pt-4">
                    <h3 class="py-4 text-center text-base font-bold text-gray-700 dark:text-gray-300">{{ __($data["lang"] . ".text.title") }}</h3>
                    <form id="frmUpdate${name}" autocomplete="off">
                        <input type="hidden" name="created_by" value="{{ Auth::user()->uuid }}" />
                        <div class="flex justify-center">
                            <div class="w-full max-w-2xl">
                                <div class="mb-4">
                                    <label class="mb-2 block font-bold text-gray-700 dark:text-gray-300">{{ __($data["lang"] . ".label.name") }} <em class="text-red-500">*</em></label>
                                    <input type="text" name="name" id="name" value="{{ $data["item"]?->name }}" placeholder="{{ __($data["lang"] . ".placeholder.name") }}" class="focus:border-body-yellow w-full rounded border border-gray-300 p-2 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                                    <span id="name_error" class="text-sm text-red-500"></span>
                                </div>
                                <div class="text-right">
                                    <button class="rounded bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600">
                                        <span>{{ __("common.btns.changes") }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
@endsection`
}