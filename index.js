const express = require('express');
const methodOverride = require('method-override');
const app = express();
const port = 3000;

const authorRoutes = require('./routes/authors');
const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');
const bookRoutes = require('./routes/books');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static('images'));
app.use(methodOverride('_method'));

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Routes
app.use('/authors', authorRoutes);
app.use('/customers', customerRoutes);
app.use('/orders', orderRoutes);
app.use('/books', bookRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

// Error handling middleware (404)
app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});