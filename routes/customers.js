const express = require('express');
const router = express.Router();
const pool = require('../services/sql/db'); // Adjust path as necessary

// Get all customers
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Customer');
        res.render('customers/index', { customers: result.rows });
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Get all customers as JSON
router.get('/api', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Customer');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// Create new customer form
router.get('/create', (req, res) => {
    res.render('customers/create');
});

// Create new customer
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Customer (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        res.redirect('/customers');
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Edit customer form
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Customer WHERE customer_id = $1', [id]);
        res.render('customers/edit', { customer: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Update customer
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Customer SET name = $1, email = $2, password = $3 WHERE customer_id = $4 RETURNING *',
            [name, email, password, id]
        );
        res.redirect('/customers');
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Delete customer
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Customer WHERE customer_id = $1');
        res.redirect('/customers');
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

module.exports = router;