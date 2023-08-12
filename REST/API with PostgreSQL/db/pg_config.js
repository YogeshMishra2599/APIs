require('dotenv').config();
const Pool = require('pg').Pool;

const pool = new Pool({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    database: process.env.PG_DATABASE,
    password: process.env.PG_SECRET,
    max: 20,
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
});

module.exports = pool;