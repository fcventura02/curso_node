const fs = require('fs')

if (!fs.existsSync('./estrela-da-morte')) {
    console.log('Não existe')
}

fs.mkdirSync('estrela-da-morte')

if (fs.existsSync('estrela-da-morte')) {
    console.log('Existe')
}