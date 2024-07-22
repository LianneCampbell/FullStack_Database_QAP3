// Import the pool instance from the database configuration module
const pool = require('./db');

module.exports = {
    // Insert operations
    // Inserts a new author into the 'Author' table
    insertAuthor: async (name, biography) => {
        const result = await pool.query(
            'INSERT INTO Author (name, biography) VALUES ($1, $2) RETURNING *',
            [name, biography]
        );
        return result.rows[0]; // Return the newly created author record
    },

    // Inserts a new book into the 'Book' table
    insertBook: async (title, price, genre, author_id) => {
        const result = await pool.query(
            'INSERT INTO Book (title, price, genre, author_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, price, genre, author_id]
        );
        return result.rows[0]; // Return the newly created book record
    },

    // Inserts a new order into the 'TotalOrder' table
    insertOrder: async (order_date, customer_id, total_amount) => {
        const result = await pool.query(
            'INSERT INTO TotalOrder (order_date, customer_id, total_amount) VALUES ($1, $2, $3) RETURNING *',
            [order_date, customer_id, total_amount]
        );
        return result.rows[0]; // Return the newly created order record
    },

    // Inserts a new customer into the 'Customer' table
    insertCustomer: async (name, email, address) => {
        const result = await pool.query(
            'INSERT INTO Customer (name, email, address) VALUES ($1, $2, $3) RETURNING *',
            [name, email, address]
        );
        return result.rows[0]; // Return the newly created customer record
    },

    // Select operations
    // Retrieves all authors from the 'Author' table
    getAllAuthors: async () => {
        const result = await pool.query('SELECT * FROM Author');
        return result.rows; // Return all author records
    },

    // Retrieves all books from the 'Book' table
    getAllBooks: async () => {
        const result = await pool.query('SELECT * FROM Book');
        return result.rows; // Return all book records
    },

    // Retrieves all orders from the 'TotalOrder' table
    getAllOrders: async () => {
        const result = await pool.query('SELECT * FROM TotalOrder');
        return result.rows; // Return all order records
    },

    // Retrieves all customers from the 'Customer' table
    getAllCustomers: async () => {
        const result = await pool.query('SELECT * FROM Customer');
        return result.rows; // Return all customer records
    },

    // Update operations
    // Updates an existing author in the 'Author' table
    updateAuthor: async (author_id, name, biography) => {
        const result = await pool.query(
            'UPDATE Author SET name = $1, biography = $2 WHERE author_id = $3 RETURNING *',
            [name, biography, author_id]
        );
        return result.rows[0]; // Return the updated author record
    },

    // Updates an existing book in the 'Book' table
    updateBook: async (book_id, title, price, genre, author_id) => {
        const result = await pool.query(
            'UPDATE Book SET title = $1, price = $2, genre = $3, author_id = $4 WHERE book_id = $5 RETURNING *',
            [title, price, genre, author_id, book_id]
        );
        return result.rows[0]; // Return the updated book record
    },

    // Updates an existing order in the 'TotalOrder' table
    updateOrder: async (order_id, order_date, customer_id, total_amount) => {
        const result = await pool.query(
            'UPDATE TotalOrder SET order_date = $1, customer_id = $2, total_amount = $3 WHERE order_id = $4 RETURNING *',
            [order_date, customer_id, total_amount, order_id]
        );
        return result.rows[0]; // Return the updated order record
    },

    // Updates an existing customer in the 'Customer' table
    updateCustomer: async (customer_id, name, email, address) => {
        const result = await pool.query(
            'UPDATE Customer SET name = $1, email = $2, address = $3 WHERE customer_id = $4 RETURNING *',
            [name, email, address, customer_id]
        );
        return result.rows[0]; // Return the updated customer record
    },

    // Delete operations
    // Deletes an author from the 'Author' table
    deleteAuthor: async (author_id) => {
        await pool.query('DELETE FROM Author WHERE author_id = $1', [author_id]);
    },

    // Deletes a book from the 'Book' table
    deleteBook: async (book_id) => {
        await pool.query('DELETE FROM Book WHERE book_id = $1', [book_id]);
    },

    // Deletes an order from the 'TotalOrder' table
    deleteOrder: async (order_id) => {
        await pool.query('DELETE FROM TotalOrder WHERE order_id = $1', [order_id]);
    },

    // Deletes a customer from the 'Customer' table
    deleteCustomer: async (customer_id) => {
        await pool.query('DELETE FROM Customer WHERE customer_id = $1', [customer_id]);
    }
};