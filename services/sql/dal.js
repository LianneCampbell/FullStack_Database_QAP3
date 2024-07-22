const pool = require('./db');

module.exports = {
    // Insert operations
    insertAuthor: async (name, biography) => {
        const result = await pool.query(
            'INSERT INTO Author (name, biography) VALUES ($1, $2) RETURNING *',
            [name, biography]
        );
        return result.rows[0];
    },
    insertBook: async (title, price, genre, author_id) => {
        const result = await pool.query(
            'INSERT INTO Book (title, price, genre, author_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, price, genre, author_id]
        );
        return result.rows[0];
    },
    insertOrder: async (order_date, customer_id, total_amount) => {
        const result = await pool.query(
            'INSERT INTO TotalOrder (order_date, customer_id, total_amount) VALUES ($1, $2, $3) RETURNING *',
            [order_date, customer_id, total_amount]
        );
        return result.rows[0];
    },
    insertCustomer: async (name, email, address) => {
        const result = await pool.query(
            'INSERT INTO Customer (name, email, address) VALUES ($1, $2, $3) RETURNING *',
            [name, email, address]
        );
        return result.rows[0];
    },

    // Select operations
    getAllAuthors: async () => {
        const result = await pool.query('SELECT * FROM Author');
        return result.rows;
    },
    getAllBooks: async () => {
        const result = await pool.query('SELECT * FROM Book');
        return result.rows;
    },
    getAllOrders: async () => {
        const result = await pool.query('SELECT * FROM TotalOrder');
        return result.rows;
    },
    getAllCustomers: async () => {
        const result = await pool.query('SELECT * FROM Customer');
        return result.rows;
    },

    // Update operations
    updateAuthor: async (author_id, name, biography) => {
        const result = await pool.query(
            'UPDATE Author SET name = $1, biography = $2 WHERE author_id = $3 RETURNING *',
            [name, biography, author_id]
        );
        return result.rows[0];
    },
    updateBook: async (book_id, title, price, genre, author_id) => {
        const result = await pool.query(
            'UPDATE Book SET title = $1, price = $2, genre = $3, author_id = $4 WHERE book_id = $5 RETURNING *',
            [title, price, genre, author_id, book_id]
        );
        return result.rows[0];
    },
    updateOrder: async (order_id, order_date, customer_id, total_amount) => {
        const result = await pool.query(
            'UPDATE TotalOrder SET order_date = $1, customer_id = $2, total_amount = $3 WHERE order_id = $4 RETURNING *',
            [order_date, customer_id, total_amount, order_id]
        );
        return result.rows[0];
    },
    updateCustomer: async (customer_id, name, email, address) => {
        const result = await pool.query(
            'UPDATE Customer SET name = $1, email = $2, address = $3 WHERE customer_id = $4 RETURNING *',
            [name, email, address, customer_id]
        );
        return result.rows[0];
    },

    // Delete operations
    deleteAuthor: async (author_id) => {
        await pool.query('DELETE FROM Author WHERE author_id = $1', [author_id]);
    },
    deleteBook: async (book_id) => {
        await pool.query('DELETE FROM Book WHERE book_id = $1', [book_id]);
    },
    deleteOrder: async (order_id) => {
        await pool.query('DELETE FROM TotalOrder WHERE order_id = $1', [order_id]);
    },
    deleteCustomer: async (customer_id) => {
        await pool.query('DELETE FROM Customer WHERE customer_id = $1', [customer_id]);
    }
};