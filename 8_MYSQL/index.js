const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home');
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
});

connection.connect((err) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log('Conectado ao banco de dados MySQL');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});