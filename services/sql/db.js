const Pool = require('pg').Pool
const pool = new Pool({
  user: 'lianne',
  host: 'localhost',
  database: 'online_bookstore',
  password: 'book',
  port: 5434,
});
module.exports = pool;