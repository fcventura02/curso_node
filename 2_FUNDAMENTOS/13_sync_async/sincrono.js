const fs = require("fs");

console.log("Início");

fs.writeFileSync("arquivo_sincrono.txt", "Oi");

console.log("Fim");