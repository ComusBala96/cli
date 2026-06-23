// src/generators/TableGenerator.mjs

import path from 'path';

import { BaseGenerator } from './BaseGenerator.mjs';

export class TableGenerator extends BaseGenerator {
    async generate(data) {
        this.data = data;
        this.write(path.join(this.path('migration'), this.context.migrationFile), this.render('migration.stub'));
        this.write(path.join(this.path('model'), `${this.context.model}.php`), this.render('model.stub'));
    }
}
