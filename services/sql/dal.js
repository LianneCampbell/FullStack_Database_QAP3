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
    // Select operations
    getAllAuthors: async () => {
        const result = await pool.query('SELECT * FROM Author');
        return result.rows;
    },
    getAllBooks: async () => {
        const result = await pool.query('SELECT * FROM Book');
        return result.rows;
    },
    // Update operations
    updateBookPrice: async (book_id, newPrice) => {
        const result = await pool.query(
            'UPDATE Book SET price = $1 WHERE book_id = $2 RETURNING *',
            [newPrice, book_id]
        );
        return result.rows[0];
    },
    // Delete operations
    deleteBook: async (book_id) => {
        await pool.query('DELETE FROM Book WHERE book_id = $1', [book_id]);
    }
};