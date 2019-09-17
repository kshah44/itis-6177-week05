const express = require('express');
const mariadb = require('mariadb');

const app = express();
const port = 80;

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'employees',
    connectionLimit: 5
});

app.get('/', function (req, res) {

    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM employess LIMIT 10");
        console.log(rows); //[ {val: 1}, meta: ... ]
        res.json({
            response: sqlRes
        });

    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.end();
    }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
