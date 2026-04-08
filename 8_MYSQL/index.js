const express = require('express');
const exphbs = require('express-handlebars');

const pool = require('./db/connections')

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

    const query = `INSERT INTO books (??, ??) VALUES (?, ?)`
    const data = ['title', 'pageqty', title, pageqty]

    pool.query(query, data, function (err) {
        if (err) {
            console.log(err)
        }

        res.redirect('/')
    })
})

app.get('/books', function (req, res) {
    const query = `SELECT * FROM books`

    pool.query(query, function (err, data) {
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

    const query = `SELECT * FROM books WHERE ?? = ?`
    const data = ['idbooks', id]
    pool.query(query, data, function (err, data) {
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

    const query = `SELECT * FROM books WHERE ?? = ?`
    const data = ['idbooks', id]
    pool.query(query, data, function (err, data) {
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

    const query = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?`
    const data = ['title', title, 'pageqty', pageqty, 'idbooks', id]
    pool.query(query, data, function (err) {
        if (err) {
            console.log(err)
        }

        res.redirect(`/books/${id}`)
    })
})

app.post('/books/remove', function (req, res) {
    const id = req.body.id

    const query = `DELETE FROM books WHERE ?? = ?`
    const data = ['idbooks', id]
    pool.query(query, data, function (err) {
        if (err) {
            console.log(err)
        }

        res.redirect(`/books`)
    })
})


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});