import chalk from "chalk";
import inquirer from "inquirer";

import fs from "fs";

const prompt = inquirer.createPromptModule();

function operation() {
    prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O que deseja fazer?',
            choices: [
                'Criar conta',
                'Consultar saldo',
                'Depositar',
                'Sacar',
                'Sair'
            ]
        }
    ]).then((answer) => {
        const action = answer['action'];
        if (action === 'Criar conta') {
            console.log(chalk.bgGreen.black('Conta criada com sucesso!'));
        }
    }).catch((error) => {
        console.log(error);
    });

}

operation();