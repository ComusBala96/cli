#!/usr/bin/env node
import inquirer from 'inquirer';
import { getProjectsDir } from './src/utils/functions/functions.mjs';
import { actions, operations } from './src/utils/definitions/definitions.mjs';
import { createCrud } from './src/utils/crud/crud.mjs';
import { createTable } from './src/utils/table/table.mjs';
import { createInterface } from './src/utils/interface/interface.mjs';

let data = {};
if (process.argv[2] == 'create') {
    inquirer.prompt([
        {
            type: 'list',
            name: 'project',
            message: 'Choose the project where you want to install?',
            choices: getProjectsDir(),
        }
    ]).then((res) => {
        if (res.project == 'lensasia') {
            data = { ...data, project: res.project };
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'What action do you want to perform?',
                    choices: actions,
                }
            ]).then((res) => {
                if (res.action == 'create') {
                    inquirer.prompt([
                        {
                            type: 'list',
                            name: 'operation',
                            message: 'What operation do you want to perform?',
                            choices: operations,
                        }
                    ]).then((res) => {
                        if (res.operation == 'crud') {
                            data = { ...data, operation: res.operation };
                            inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'namespace',
                                    message: 'Enter namespace.eg. admin/dashboard/../..?',
                                }
                            ]).then((res) => {
                                if (res.namespace) {
                                    data = { ...data, namespace: res.namespace.trim() };
                                    inquirer.prompt([
                                        {
                                            type: 'input',
                                            name: 'name',
                                            message: 'Enter module name.eg. Breaking/News/../..?',
                                        }
                                    ]).then((res) => {
                                        if (res.name) {
                                            data = { ...data, name: res.name.trim() };
                                            inquirer.prompt([
                                                {
                                                    type: 'input',
                                                    name: 'model',
                                                    message: 'Enter model name.Eg. User?',
                                                }
                                            ]).then((res) => {
                                                if (res.model) {
                                                    data = { ...data, model: res.model.trim() };
                                                    createCrud(data);
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                        if (res.operation == 'table') {
                            data = { ...data, operation: res.operation };
                            inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'namespace',
                                    message: 'Enter namespace.eg. admin/dashboard/../..?',
                                }
                            ]).then((res) => {
                                if (res.namespace) {
                                    data = { ...data, namespace: res.namespace.trim() };
                                    inquirer.prompt([
                                        {
                                            type: 'input',
                                            name: 'name',
                                            message: 'Enter module name.eg. Breaking/News/../..?',
                                        }
                                    ]).then((res) => {
                                        if (res.name) {
                                            data = { ...data, name: res.name.trim() };
                                            inquirer.prompt([
                                                {
                                                    type: 'input',
                                                    name: 'model',
                                                    message: 'Enter model name.Eg. User?',
                                                }
                                            ]).then((res) => {
                                                if (res.model) {
                                                    data = { ...data, model: res.model.trim() };
                                                    createTable(data);
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                        if (res.operation == 'interface') {
                            data = { ...data, operation: res.operation };
                            inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'namespace',
                                    message: 'Enter namespace.eg. admin/dashboard/../..?',
                                }
                            ]).then((res) => {
                                if (res.namespace) {
                                    data = { ...data, namespace: res.namespace.trim() };
                                    inquirer.prompt([
                                        {
                                            type: 'input',
                                            name: 'name',
                                            message: 'Enter module name.eg. Breaking/News/../..?',
                                        }
                                    ]).then((res) => {
                                        if (res.name) {
                                            data = { ...data, name: res.name.trim() };
                                            inquirer.prompt([
                                                {
                                                    type: 'input',
                                                    name: 'model',
                                                    message: 'Enter model name.Eg. User?',
                                                }
                                            ]).then((res) => {
                                                if (res.model) {
                                                    data = { ...data, model: res.model.trim() };
                                                    createInterface(data);
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
}

// if (process.argv[0]) {
//     console.log('Welcome to oriansoft.');
    
      
// }