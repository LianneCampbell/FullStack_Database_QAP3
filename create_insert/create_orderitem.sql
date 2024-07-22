CREATE TABLE OrderItem (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT,
    book_id INT,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES TotalOrder(order_id),
    FOREIGN KEY (book_id) REFERENCES Book(book_id)
);