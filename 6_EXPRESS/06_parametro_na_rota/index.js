const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const basePath = path.join(__dirname, "templates");

app.get("/user/:id", (req, res) => {
    const id = req.params.id;
    //Logica para buscar o usuário no banco de dados
    console.log(`buscando o usuário: ${id}`);
    res.sendFile(`${basePath}/index.html`);
});

app.get("/", (req, res) => {
    res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log("Acesse : http://localhost:3000");
});