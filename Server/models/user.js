const { con, query } = require('./db_connect');

async function createUserTable() {
    let sql = `CREATE TABLE IF NOT EXISTS Users (
        UserID INT NOT NULL AUTO_INCREMENT,
        FirstName VARCHAR(50) NOT NULL,
        LastName VARCHAR(50) NOT NULL,
        UserName VARCHAR(50) NOT NULL UNIQUE,
        Password VARCHAR(255) NOT NULL,
        CONSTRAINT pk_user PRIMARY KEY (UserID)
    )`;
    await query(sql);
}
createUserTable();

async function getAllUsers() {
    let sql = `SELECT * FROM Users;`
    return await query(sql)
}

module.exports = { getAllUsers }