const express = require("express");
const app = express();
const port = 3000;

const path = require("path");
const basePath = path.join(__dirname, "templates");

const usersRoutes = require("./routes/users");

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

app.use("/users", usersRoutes);

app.get("/", (req, res) => {
    res.sendFile(`${basePath}/index.html`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log("Acesse : http://localhost:3000");
});