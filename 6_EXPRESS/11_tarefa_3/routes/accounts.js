const express = require("express");
const router = express.Router();

const fs = require("fs");

const path = require("path");
const basePath = path.join(__dirname, "../templates");

router.get("/", (req, res) => {
    res.sendFile(`${basePath}/accounts.html`);
});

router.get("/list", (req, res) => {
    const accounts = fs.readdirSync("accounts");
    const accountsList = [];
    accounts.forEach(account => {
        const accountData = fs.readFileSync(`accounts/${account}`, "utf-8");
        accountsList.push({ name: account.replace(".json", ""), balance: JSON.parse(accountData).balance });
    });
    res.json(accountsList);
});

router.get("/create", (req, res) => {
    res.sendFile(`${basePath}/create.html`);
});

router.post("/create", (req, res) => {
    const accountName = req.body.accountName;
    if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts');
    }
    if (fs.existsSync(`accounts/${accountName}.json`)) {
        res.status(400).send("Conta já existe!");
        return;
    }
    fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function (err) {
        console.log(err);
    });
    res.status(200).json({ message: "Conta criada com sucesso!", balance: 0 });
});

router.put("/deposit/:accountName", (req, res) => {
    const accountName = req.params.accountName;
    const amount = parseInt(req.body.amount);
    const accountData = fs.readFileSync(`accounts/${accountName}.json`, "utf-8");
    const account = JSON.parse(accountData);
    account.balance += amount;
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(account), function (err) {
        console.log(err);
    });
    res.status(200).json({ message: "Depósito realizado com sucesso!", balance: account.balance });
});

router.put("/withdraw/:accountName", (req, res) => {
    const accountName = req.params.accountName;
    const amount = parseInt(req.body.amount);
    const accountData = fs.readFileSync(`accounts/${accountName}.json`, "utf-8");
    const account = JSON.parse(accountData);
    if (account.balance < amount) {
        res.status(400).send({ message: "Saldo insuficiente!", balance: account.balance });
        return;
    }
    account.balance -= amount;
    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(account), function (err) {
        console.log(err);
    });
    res.status(200).json({ message: "Saque realizado com sucesso!", balance: account.balance });
});

router.delete("/delete/:accountName", (req, res) => {
    const accountName = req.params.accountName;
    if (!fs.existsSync('accounts')) {
        fs.mkdirSync('accounts');
    }
    fs.unlinkSync(`accounts/${accountName}.json`);
    res.status(200).json({ message: "Conta excluída com sucesso!" });
});

module.exports = router;