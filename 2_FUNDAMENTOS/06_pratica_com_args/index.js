//interno
const soma = require("./soma").soma;

//externo
const minimist = require("minimist");

const args = minimist(process.argv.slice(2));
const a = args["a"];
const b = args["b"];

console.log(soma(a, b));
