require('dotenv').config();
const mysql = require('mysql2/promise');

const con = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PSWD,
    database: process.env.MYSQL_DB
});

const query = async (sql, binding) => {
    const [rows] = await con.execute(sql, binding);
    return rows;
};

module.exports = { con, query };

con.getConnection((err, connection) => {
    if (err) console.log("DB CONNECTION ERROR:", err.message);
    else console.log("DB connected successfully!");
});