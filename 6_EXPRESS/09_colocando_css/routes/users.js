const express = require("express");
const router = express.Router();

const path = require("path");
const basePath = path.join(__dirname, "..", "templates");

router.get("/create", (req, res) => {
    res.sendFile(`${basePath}/userform.html`);
});

router.post("/save", (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    console.log(`Usuário criado: ${name} - ${age}`);
    res.sendFile(`${basePath}/userform.html`);
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    //Logica para buscar o usuário no banco de dados
    console.log(`buscando o usuário: ${id}`);
    res.sendFile(`${basePath}/index.html`);
});


module.exports = router;