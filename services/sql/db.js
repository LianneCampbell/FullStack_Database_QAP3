// Import the Pool class from the 'pg' module to manage PostgreSQL connections
const Pool = require('pg').Pool;

// Create a new instance of Pool with configuration options
const pool = new Pool({
  // Database user
  user: 'postgres',

  // Host where the PostgreSQL server is running
  host: 'localhost',

  // Name of the database to connect to
  database: 'online_bookstore',

  // Password for the database user (left empty in this example)
  password: '',

  // Port on which the PostgreSQL server is listening
  port: 5432,
});

// Export the pool instance to be used in other parts of the application
module.exports = pool;