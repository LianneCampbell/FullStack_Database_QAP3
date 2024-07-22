const express = require('express');
const router = express.Router();
const pool = require('../services/sql/db'); // Adjust path as necessary

// Get all orders
// Retrieves all orders from the database and renders them in the 'orders/index' view
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM TotalOrder');
        res.render('orders/index', { orders: result.rows });
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

// Get all orders as JSON
// Retrieves all orders from the database and returns them as a JSON response
router.get('/api', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM TotalOrder');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message }); // Send error response with status 500 if there's an issue
    }
});

// Create new order form
// Renders the form to create a new order
router.get('/create', (req, res) => {
    res.render('orders/create');
});

// Create new order
// Handles form submission for creating a new order
router.post('/', async (req, res) => {
    const { order_date, customer_id, total_amount } = req.body;
    try {
        await pool.query(
            'INSERT INTO TotalOrder (order_date, customer_id, total_amount) VALUES ($1, $2, $3)',
            [order_date, customer_id, total_amount]
        );
        res.redirect('/orders'); // Redirect to the orders list after creation
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

// Edit order form
// Retrieves order details for editing and renders them in the 'orders/edit' view
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM TotalOrder WHERE order_id = $1', [id]);
        res.render('orders/edit', { order: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

// Update order
// Handles form submission for updating an existing order
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { order_date, customer_id, total_amount } = req.body;
    try {
        await pool.query(
            'UPDATE TotalOrder SET order_date = $1, customer_id = $2, total_amount = $3 WHERE order_id = $4',
            [order_date, customer_id, total_amount, id]
        );
        res.redirect('/orders'); // Redirect to the orders list after update
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

// Delete order
// Deletes an order from the database
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM TotalOrder WHERE order_id = $1', [id]);
        res.redirect('/orders'); // Redirect to the orders list after deletion
    } catch (err) {
        console.error(err);
        res.send("Error " + err); // Send error message if there's an issue
    }
});

module.exports = router;