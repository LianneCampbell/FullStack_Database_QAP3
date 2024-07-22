const express = require('express');
const router = express.Router();
const pool = require('../services/sql/db'); // Adjust path as necessary

// Get all books
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Book');
        res.render('books/index', { books: result.rows });
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Get all books as JSON
router.get('/api', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Book');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Create new book form
router.get('/create', (req, res) => {
    res.render('books/create');
});

// Create new book
router.post('/', async (req, res) => {
    const { title, price, genre, author_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Book (title, price, genre, author_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, price, genre, author_id]
        );
        res.redirect('/books');
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Edit book form
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Book WHERE book_id = $1', [id]);
        res.render('books/edit', { book: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Update book
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, price, genre, author_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Book SET title = $1, price = $2, genre = $3, author_id = $4 WHERE book_id = $5 RETURNING *',
            [title, price, genre, author_id, id]
        );
        res.redirect('/books');
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Delete book
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Book WHERE book_id = $1');
        res.redirect('/books');
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

module.exports = router;