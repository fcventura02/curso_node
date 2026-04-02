import chalk from "chalk";
import inquirer from "inquirer";

import fs from "fs";

const prompt = inquirer.createPromptModule();

function operation() {
    console.clear();
    prompt([
        {
            type: 'rawlist',
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
            createAccount();
        }
    }).catch((error) => {
        console.log(error);
    });

}

function createAccount() {
    console.log(chalk.bgGreen.black('Conta criada com sucesso!'));
    console.log(chalk.green('Defina as opções da sua conta:'));
    buildAccount();
}

function buildAccount() {
    prompt([
        {
            type: 'input',
            name: 'accountName',
            message: 'Digite o nome da sua conta:'
        }
    ]).then((answer) => {
        const accountName = answer['accountName'];
        console.info(accountName);

        if (!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts');
        }

        if (fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Conta já existe!'));
            buildAccount();
            return;
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function (err) {
            console.log(err);
        });
        console.log(chalk.bgGreen.black('Conta criada com sucesso!'));
        operation();
    }).catch((error) => {
        console.log(error);
    });
}

operation();