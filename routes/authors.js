const express = require('express');
const router = express.Router();
const pool = require('../services/sql/db'); // Adjust path as necessary

// Get all authors
// Retrieves all authors from the database and renders them in the 'authors/index' view
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Author');
        res.render('authors/index', { authors: result.rows });
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

// Get all authors as JSON
// Retrieves all authors from the database and returns them as a JSON response
router.get('/api', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Author');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message }); // Send error response with status 500 if there's an issue
    }
});

// Create new author form
// Renders the form to create a new author
router.get('/create', (req, res) => {
    res.render('authors/create');
});

// Create new author
// Handles form submission for creating a new author
router.post('/', async (req, res) => {
    const { name, biography } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Author (name, biography) VALUES ($1, $2) RETURNING *',
            [name, biography]
        );
        res.redirect('/authors'); // Redirect to the authors list after creation
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

// Edit author form
// Retrieves author details for editing and renders them in the 'authors/edit' view
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Author WHERE author_id = $1', [id]);
        res.render('authors/edit', { author: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

// Update author
// Handles form submission for updating an existing author
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, biography } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Author SET name = $1, biography = $2 WHERE author_id = $3 RETURNING *',
            [name, biography, id]
        );
        res.redirect('/authors'); // Redirect to the authors list after update
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

// Delete author
// Deletes an author from the database
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Author WHERE author_id = $1', [id]);
        res.redirect('/authors'); // Redirect to the authors list after deletion
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

module.exports = router;