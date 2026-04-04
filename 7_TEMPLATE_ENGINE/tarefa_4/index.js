const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

const hbs = exphbs.create({
    partialsDir: ["views/components"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.static("public"));

const products = [
    {
        id: "1",
        title: "Livro",
        price: 12.90,
    },
    {
        id: "2",
        title: "Cadeira",
        price: 200.99,
    },
    {
        id: "3",
        title: "Lâmpada",
        price: 2.00,
    },
    {
        id: "4",
        title: "Mesa",
        price: 150.00,
    },
    {
        id: "5",
        title: "Mouse",
        price: 20.00,
    },
    {
        id: "6",
        title: "Teclado",
        price: 50.00,
    },
    {
        id: "7",
        title: "Monitor",
        price: 500.00,
    },
];

app.get("/", function (req, res) {
    res.render("home", { products });
});

app.get("/product/:id", function (req, res) {
    const product = products[req.params.id];

    res.render("product", { product });
});

app.listen(3000);