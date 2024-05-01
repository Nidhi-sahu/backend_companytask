
const mysql = require('mysql');

const connection = mysql.createConnection({
    user: "root",
    password: "",
    port: 3306,
    host: "localhost",
    database: "company_task"
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to database');
});

module.exports = connection;
