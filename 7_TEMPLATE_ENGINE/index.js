const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
    const user = {
        name: "Filipe",
        age: 22,
    };

    const job = "Programador";

    const auth = true;
    const approved = false;
    res.render("home", { user, job, auth, approved });
});

app.get("/dashboard", (req, res) => {
    const list = [{ id: 1, item: "item 1" }, { id: 2, item: "item 2" }, { id: 3, item: "item 3" }]
    res.render("dashboard", { list });
});

app.get("/post", (req, res) => {
    const post = {
        title: "Post 1",
        category: "Programação",
        body: "Conteúdo do post 1 ",
        comments: 4,
    }
    res.render("blogpost", { post });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
    console.log("http://localhost:3000");
});