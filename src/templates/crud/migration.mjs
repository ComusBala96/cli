import pluralize from "pluralize";
import { toSnakeCase } from "../../utils/functions/functions.mjs";

export function getMigration(res) {
    let table = pluralize(toSnakeCase(res?.model?.toLowerCase()));
    return `<?php

use Illuminate\\Database\\Migrations\\Migration;
use Illuminate\\Database\\Schema\\Blueprint;
use Illuminate\\Support\\Facades\\Schema;

return new class () extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('${table}', function (Blueprint $table) {
            $table->id();
            $table->uuid('uuid');
            $table->integer('serial');
            $table->string('name');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('${table}');
    }
};`
}