const express = require('express');
const mariadb = require('mariadb');

const app = express();
const port = 80;

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'employees',
    connectionLimit: 50
});

app.get('/', function (req, res) {
    pool.getConnection()
        .then(conn => {
            conn.query('SELECT * FROM employees LIMIT 10')
                .then(sqlRes => {
                    res.json({
                        response: sqlRes
                    });
            });
            conn.release();
        })
        .catch(err => {
            console.log("not connected due to error: " + err);
        });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
