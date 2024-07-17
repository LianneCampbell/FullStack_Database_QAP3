const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method')); // for PUT and DELETE methods

// Set up views and view engine (assuming you are using EJS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Define and use routes
const authorRoutes = require('./routes/authors');
const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');
const bookRoutes = require('./routes/books');

app.use('/authors', authorRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);
app.use('/books', bookRoutes);

// Route for the root URL
app.get('/', (req, res) => {
    res.render('index'); // Assuming 'index.ejs' is your root view
});

// Error handling middleware (404)
app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});