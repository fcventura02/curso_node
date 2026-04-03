const express = require("express");
const app = express();
const port = 5000;

const path = require("path");
const basePath = path.join(__dirname, "templates");

app.use(express.static("public"));

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

const accountsRoutes = require("./routes/accounts");

app.use("/accounts", accountsRoutes);

app.get("/", (req, res) => {
    res.sendFile(`${basePath}/index.html`);
});

app.use((req, res) => {
    res.status(404).sendFile(`${basePath}/404.html`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});