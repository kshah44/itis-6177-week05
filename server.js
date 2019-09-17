const express = require('express');
const mariadb = require('mariadb');
const path = require('path');

const app = express();
const port = 80;

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'employees',
    connectionLimit: 50
});

app.use(express.static('public'));

app.get('/employees', function (req, res) {
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

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
