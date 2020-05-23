const keys = require('../config/keys');
const { Pool } = require('pg');
const pool = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: 5432,
    ssl: true
});

pool.connect()
    .then(() => console.log("Connected Successfully!"))
    .catch((e) => console.log());

module.exports = pool;