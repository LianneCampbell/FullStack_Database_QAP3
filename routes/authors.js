const express = require('express');
const router = express.Router();
const pool = require('../services/sql/db'); // Adjust path as necessary

// Get all authors
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Author');
        res.render('authors/index', { authors: result.rows });
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Create new author form
router.get('/create', (req, res) => {
    res.render('authors/create');
});

// Create new author
router.post('/', async (req, res) => {
    const { name, biography } = req.body;
    try {
        await pool.query(
            'INSERT INTO Author (name, biography) VALUES ($1, $2)',
            [name, biography]
        );
        res.redirect('/authors');
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Edit author form
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Author WHERE author_id = $1', [id]);
        res.render('authors/edit', { author: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Update author
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, biography } = req.body;
    try {
        await pool.query(
            'UPDATE Author SET name = $1, biography = $2 WHERE author_id = $3',
            [name, biography, id]
        );
        res.redirect('/authors');
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Delete author
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Author WHERE author_id = $1', [id]);
        res.redirect('/authors');
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

module.exports = router;