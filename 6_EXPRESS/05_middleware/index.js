const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const basePath = path.join(__dirname, "templates");

// 1. Criar um middleware
const checkAuth = (req, res, next) => {
    req.authStatus = true;
    if (req.authStatus) {
        console.log("Usuário autenticado");
        next();
    } else {
        console.log("Usuário não autenticado");
        return;
    }
};

// 2. Usar o middleware
app.use(checkAuth);

app.get("/", (req, res) => {
    res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log("Acesse : http://localhost:3000");
});