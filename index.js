#!/usr/bin/env node

import inquirer from 'inquirer';
import { getProjectsDir } from './src/utils/functions/functions.mjs';
import { actions, operations } from './src/utils/definitions/definitions.mjs';
import { createCrud } from './src/utils/crud/crud.mjs';
import { createTable } from './src/utils/table/table.mjs';
import { createInterface } from './src/utils/interface/interface.mjs';

async function askProject() {
    return await inquirer.prompt([
        {
            type: 'list',
            name: 'project',
            message: 'Choose project:',
            choices: getProjectsDir(),
        },
    ]);
}

async function askAction() {
    return await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose action:',
            choices: actions,
        },
    ]);
}

async function askOperation() {
    return await inquirer.prompt([
        {
            type: 'list',
            name: 'operation',
            message: 'Choose operation:',
            choices: operations,
        },
    ]);
}

async function askModuleInfo() {
    return await inquirer.prompt([
        {
            type: 'input',
            name: 'namespace',
            message: 'Namespace:',
        },
        {
            type: 'input',
            name: 'name',
            message: 'Module name:',
        },
        {
            type: 'input',
            name: 'model',
            message: 'Model name:',
        },
    ]);
}

async function run() {
    if (process.argv[2] !== 'create') {
        console.log('Usage: orian create');
        return;
    }

    const { project } = await askProject();

    // if (project !== 'lensasia') {
    //     console.log(`Project "${project}" is not supported yet.`);
    //     return;
    // }

    const { action } = await askAction();

    if (action !== 'create') {
        return;
    }

    const { operation } = await askOperation();

    const moduleData = await askModuleInfo();

    const data = {
        project,
        operation,
        ...moduleData,
    };

    switch (operation) {
        case 'crud':
            createCrud(data);
            break;

        case 'table':
            createTable(data);
            break;

        case 'interface':
            createInterface(data);
            break;

        default:
            console.log('Invalid operation');
    }
}

run().catch(console.error);
