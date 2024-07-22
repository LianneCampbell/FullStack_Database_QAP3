const express = require('express');
const router = express.Router();
const pool = require('../services/sql/db'); // Adjust path as necessary

// Get all books
// Retrieves all books from the database and renders them in the 'books/index' view
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Book');
        res.render('books/index', { books: result.rows });
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

// Get all books as JSON
// Retrieves all books from the database and returns them as a JSON response
router.get('/api', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Book');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message }); // Send error response with status 500 if there's an issue
    }
});

// Create new book form
// Renders the form to create a new book
router.get('/create', (req, res) => {
    res.render('books/create');
});

// Create new book
// Handles form submission for creating a new book
router.post('/', async (req, res) => {
    const { title, price, genre, author_id } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Book (title, price, genre, author_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, price, genre, author_id]
        );
        res.redirect('/books'); // Redirect to the books list after creation
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

// Edit book form
// Retrieves book details for editing and renders them in the 'books/edit' view
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Book WHERE book_id = $1', [id]);
        res.render('books/edit', { book: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

// Update book
// Handles form submission for updating an existing book
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, price, genre, author_id } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Book SET title = $1, price = $2, genre = $3, author_id = $4 WHERE book_id = $5 RETURNING *',
            [title, price, genre, author_id, id]
        );
        res.redirect('/books'); // Redirect to the books list after update
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

// Delete book
// Deletes a book from the database
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Book WHERE book_id = $1', [id]);
        res.redirect('/books'); // Redirect to the books list after deletion
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

module.exports = router;