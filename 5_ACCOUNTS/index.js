import chalk from "chalk";
import inquirer from "inquirer";

import fs from "fs";

const prompt = inquirer.createPromptModule();
let logedAccountName = '';

function operation() {
    console.clear();
    prompt([
        {
            type: 'rawlist',
            name: 'action',
            message: `${logedAccountName ? "\nVocê está logado em: " + chalk.bgGreen.black(logedAccountName) : ''}\nO que deseja fazer? `,
            choices: [
                'Entrar em uma conta',
                'Criar conta',
                'Consultar saldo',
                'Depositar',
                'Sacar',
                'Sair'
            ]
        }
    ]).then((answer) => {
        const action = answer['action'];
        switch (action) {
            case 'Entrar em uma conta':
                login();
                break;
            case 'Criar conta':
                createAccount();
                break;
            case 'Consultar saldo':
                getAccountBalance();
                break;
            case 'Depositar':
                deposit();
                break;
            case 'Sacar':
                withdraw();
                break;
            case 'Sair':
                console.log(chalk.bgBlue.black('Obrigado por usar o sistema!'));
                process.exit(0);
        }
    }).catch((error) => {
        console.log(error);
    });

}

function login() {
    prompt([
        {
            type: 'input',
            name: 'accountName',
            message: 'Digite o nome da sua conta:'
        }
    ]).then((answer) => {
        const accountName = answer['accountName'];
        console.info(accountName);

        if (checkAccountExists(accountName)) {
            console.log(chalk.bgRed.black('Conta não encontrada!'));
            return login();
        }

        logedAccountName = accountName;
        operation();
    }).catch((error) => {
        console.log(error);
    });
}

function createAccount() {
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

        if (checkAccountExists(accountName)) {
            console.log(chalk.bgRed.black('Conta já existe!'));
            return buildAccount();
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function (err) {
            console.log(err);
        });
        logedAccountName = accountName;
        console.log(chalk.bgGreen.black('Conta criada com sucesso!'));
        operation();
    }).catch((error) => {
        console.log(error);
    });
}

function deposit() {
    if (!logedAccountName) {
        return login();
    }
    console.info(logedAccountName);

    prompt([
        {
            type: 'input',
            name: 'amount',
            message: '\nDigite o valor do depósito:\n'
        }]).then((answer) => {
            addAmount(logedAccountName, answer['amount']);
            console.log(chalk.bgGreen.black('Depósito realizado com sucesso!'));
            operation();
        }).catch((error) => {
            console.log(error);
        });
}

function addAmount(accountName, amount) {
    const accountData = getAccount(accountName);
    if (!amount) {
        console.log(chalk.bgRed.black('Valor inválido!'));
        return deposit();
    }
    accountData.balance = parseFloat(accountData.balance) + parseFloat(amount);
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), 'utf8');
    console.log(chalk.green(`Depósito de R$${amount} realizado com sucesso!`));
}

function getAccount(accountName) {
    const accountData = fs.readFileSync(`accounts/${accountName}.json`, { encoding: 'utf8', flag: 'r' });
    const account = JSON.parse(accountData);
    return account;
}

function getAccountBalance() {
    if (!logedAccountName) {
        return login();
    }

    if (checkAccountExists(logedAccountName)) {
        return getAccountBalance();
    }

    const accountData = getAccount(logedAccountName);
    console.log(chalk.bgBlue.black(`Saldo da conta ${logedAccountName}: R$${accountData.balance}`));
    prompt([
        {
            name: 'accountName',
            message: 'Pressione Enter para continuar...'
        }]).then(() => {
            operation();
        }).catch((error) => {
            console.log(error);
        });
}

function withdraw() {
    if (!logedAccountName) {
        return login();
    }
    console.info(logedAccountName);
    prompt([
        {
            type: 'input',
            name: 'amount',
            message: '\nDigite o valor do saque: '
        }]).then((answer) => {
            removeAmount(logedAccountName, answer['amount']);
            console.log(chalk.bgGreen.black('Saque realizado com sucesso!'));
            operation();
        }).catch((error) => {
            console.log(error);
        });
}

function removeAmount(accountName, amount) {
    const accountData = getAccount(accountName);
    if (!amount) {
        console.log(chalk.bgRed.black('Valor inválido!'));
        return withdraw();
    }
    if (parseFloat(accountData.balance) < parseFloat(amount)) {
        console.log(chalk.bgRed.black('Saldo insuficiente!'));
        return withdraw();
    }
    accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), 'utf8');
    console.log(chalk.green(`Saque de R$${amount} realizado com sucesso!`));
}

function checkAccountExists(accountName) {
    if (fs.existsSync(`accounts/${accountName}.json`)) {
        return false;
    }

    return true;
}

operation();