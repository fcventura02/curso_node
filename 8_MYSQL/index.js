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

app.get('/books', function (req, res) {
    const query = `SELECT * FROM books`

    connection.query(query, function (err, data) {
        if (err) {
            console.log(err)
        }

        const books = data

        console.log(data)

        res.render('books', { books })
    })
})

app.get('/books/:id', function (req, res) {
    const id = req.params.id

    const query = `SELECT * FROM books WHERE idbooks = ${id}`

    connection.query(query, function (err, data) {
        if (err) {
            console.log(err)
        }

        const book = data[0]

        console.log(data[0])

        res.render('book', { book })
    })
})

app.get('/books/edit/:id', function (req, res) {
    const id = req.params.id

    const query = `SELECT * FROM books WHERE idbooks = ${id}`

    connection.query(query, function (err, data) {
        if (err) {
            console.log(err)
        }

        const book = data[0]

        console.log(data[0])

        res.render('editbook', { book })
    })
})

app.post('/books/updatebook', function (req, res) {
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const query = `UPDATE books SET title = '${title}', pageqty = ${pageqty} WHERE idbooks = ${id}`

    connection.query(query, function (err) {
        if (err) {
            console.log(err)
        }

        res.redirect(`/books/${id}`)
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