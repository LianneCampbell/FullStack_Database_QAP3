const express = require('express');
const router = express.Router();
const pool = require('../services/sql/db'); // Adjust path as necessary

// Get all orders
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM TotalOrder');
        res.render('orders/index', { orders: result.rows });
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Create new order form
router.get('/new', (req, res) => {
    res.render('orders/new');
});

// Create new order
router.post('/', async (req, res) => {
    const { order_date, customer_id, total_amount } = req.body;
    try {
        await pool.query(
            'INSERT INTO TotalOrder (order_date, customer_id, total_amount) VALUES ($1, $2, $3)',
            [order_date, customer_id, total_amount]
        );
        res.redirect('/orders');
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Edit order form
router.get('/:id/edit', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM TotalOrder WHERE order_id = $1', [id]);
        res.render('orders/edit', { order: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Update order
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { order_date, customer_id, total_amount } = req.body;
    try {
        await pool.query(
            'UPDATE TotalOrder SET order_date = $1, customer_id = $2, total_amount = $3 WHERE order_id = $4',
            [order_date, customer_id, total_amount, id]
        );
        res.redirect('/orders');
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Delete order
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM TotalOrder WHERE order_id = $1', [id]);
        res.redirect('/orders');
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

module.exports = router;