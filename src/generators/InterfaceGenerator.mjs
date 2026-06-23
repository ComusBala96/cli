// src/generators/InterfaceGenerator.mjs

import path from 'path';

import { BaseGenerator } from './BaseGenerator.mjs';

export class InterfaceGenerator extends BaseGenerator {
    async generate(data) {
        this.data = data;
        const namespace = this.context.namespacePath;
        this.write(path.join(this.path('repository'), namespace, `${this.context.name}Interface.php`), this.render('interface.stub'));
        this.write(path.join(this.path('repository'), namespace, `${this.context.name}Repository.php`), this.render('repository.stub'));
    }
}
