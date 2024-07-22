const express = require('express');
const router = express.Router();
const pool = require('../services/sql/db'); // Adjust path as necessary

// Get all customers
// Retrieves all customers from the database and renders them in the 'customers/index' view
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Customer');
        res.render('customers/index', { customers: result.rows });
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

// Get all customers as JSON
// Retrieves all customers from the database and returns them as a JSON response
router.get('/api', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Customer');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message }); // Send error response with status 500 if there's an issue
    }
});

// Create new customer form
// Renders the form to create a new customer
router.get('/create', (req, res) => {
    res.render('customers/create');
});

// Create new customer
// Handles form submission for creating a new customer
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO Customer (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );
        res.redirect('/customers'); // Redirect to the customers list after creation
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

// Edit customer form
// Retrieves customer details for editing and renders them in the 'customers/edit' view
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM Customer WHERE customer_id = $1', [id]);
        res.render('customers/edit', { customer: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

// Update customer
// Handles form submission for updating an existing customer
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    try {
        const result = await pool.query(
            'UPDATE Customer SET name = $1, email = $2, password = $3 WHERE customer_id = $4 RETURNING *',
            [name, email, password, id]
        );
        res.redirect('/customers'); // Redirect to the customers list after update
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

// Delete customer
// Deletes a customer from the database
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM Customer WHERE customer_id = $1', [id]);
        res.redirect('/customers'); // Redirect to the customers list after deletion
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

module.exports = router;