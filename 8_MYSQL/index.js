const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

const app = express();

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');


app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

app.use(express.static('public'));


app.get('/', function (req, res) {
    res.render('home')
})

app.post('/books/insertbook', function (req, res) {
    const title = req.body.title
    const pageqty = req.body.pageqty

    const query = `INSERT INTO books (title, pageqty) VALUES ('${title}', ${pageqty})`

    connection.query(query, function (err) {
        if (err) {
            console.log(err)
        }

        res.redirect('/')
    })
})

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