const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const basePath = path.join(__dirname, "templates");

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.get("/user/create", (req, res) => {
    res.sendFile(`${basePath}/userform.html`);
});

app.post("/user/save", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    console.log(`Usuário criado: ${name} - ${age}`);
    res.sendFile(`${basePath}/userform.html`);
});

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