// Import necessary modules
const express = require('express');
const methodOverride = require('method-override');

const app = express(); // Create an Express application
const port = 3000; // Define the port number

// Import route handlers
const authorRoutes = require('./routes/authors');
const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');
const bookRoutes = require('./routes/books');

// Middleware to parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true }));

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));

// Middleware to serve static files from the 'images' directory
app.use(express.static('images'));

// Middleware to support HTTP verbs like PUT and DELETE where the client doesn't support it
app.use(methodOverride('_method'));

// Set the view engine to EJS for rendering views
app.set('view engine', 'ejs');

// Use the imported route handlers
app.use('/authors', authorRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);
app.use('/books', bookRoutes);

// Define the root route
app.get('/', (req, res) => {
    res.render('index');
});

// Error handling middleware for 404 Not Found
app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

// Start the server and listen on the defined port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});