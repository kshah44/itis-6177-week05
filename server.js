const express = require('express');
const mariadb = require('mariadb');

const app = express();
const port = 3000;

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    db: 'employees',
    connectionLimit: 5
});

app.get('/', function (req, res) {
    pool.getConnection()
        .then(conn => {
            console.log("connected ! connection id is " + conn.threadId);
            conn.query('SELECT * FROM employess LIMIT 10')
                .then(sqlRes => {
                    res.json({
                        response: sqlRes
                    });
            });
            conn.release(); //release to pool
        })
        .catch(err => {
            console.log("not connected due to error: " + err);
        });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
