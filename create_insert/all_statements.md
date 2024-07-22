# SQL Statements for PGAdmin

## Create Statements
**Create Tables**
-- Book Table
CREATE TABLE Book (
    book_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    author_id INT REFERENCES Author(author_id)
);

-- Customer Table
CREATE TABLE Customer (
    customer_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

-- TotalOrder Table
CREATE TABLE TotalOrder (
    order_id SERIAL PRIMARY KEY,
    order_date DATE NOT NULL,
    customer_id INT REFERENCES Customer(customer_id),
    total_amount DECIMAL(10, 2) NOT NULL
);

-- Author Table
CREATE TABLE Author (
    author_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    biography TEXT
);

-- OrderItem Table
CREATE TABLE OrderItem (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT REFERENCES TotalOrder(order_id),
    book_id INT REFERENCES Book(book_id),
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);
**Insert Statements**
-- Insert Sample Data
INSERT INTO Author (name, biography) VALUES ('Author Name', 'Biography...');
INSERT INTO Book (title, price, genre, author_id) VALUES ('Book Title', 19.99, 'Fiction', 1);
INSERT INTO Customer (name, email, password) VALUES ('Customer Name', 'email@example.com', 'encryptedpassword');
INSERT INTO TotalOrder (order_date, customer_id, total_amount) VALUES ('2024-07-17', 1, 39.98);
INSERT INTO OrderItem (order_id, book_id, quantity, price) VALUES (1, 1, 2, 19.99);

-- Select Data
SELECT * FROM Author;
SELECT * FROM Book;
SELECT * FROM Customer;
SELECT * FROM TotalOrder;
SELECT * FROM OrderItem;

**Update and Delete Statements**
-- Update Data
UPDATE Book SET price = 18.99 WHERE book_id = 1;

-- Delete Data
DELETE FROM OrderItem WHERE order_item_id = 1;