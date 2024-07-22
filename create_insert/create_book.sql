CREATE TABLE Book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    author_id INT,
    FOREIGN KEY (author_id) REFERENCES Author(author_id)
);
