const fs = require("fs");

fs.readFile("1_INTRO/2_Utilizando_modulos/arquivo.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    }
    console.log(data);
});