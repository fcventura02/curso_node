const path = require('path')

// path absoluto
console.log(path.resolve('teste.txt'))

// formar path
const midFolder = 'lados-escuros'
const fileName = 'obi-wan.txt'

const finalPath = path.join('/', 'arquivos', midFolder, fileName)

console.log(finalPath)