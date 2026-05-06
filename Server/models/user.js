const bcrypt = require("bcrypt")
const con = require('./db_connect');

async function createUserTable() {
    let sql = `
        CREATE TABLE IF NOT EXISTS Users (
            UserID INT NOT NULL AUTO_INCREMENT,
            FirstName VARCHAR(50) NOT NULL,
            LastName VARCHAR(50) NOT NULL,
            UserName VARCHAR(50) NOT NULL UNIQUE,
            Password VARCHAR(255) NOT NULL,
            CONSTRAINT pk_user PRIMARY KEY (UserID)
        );
    `
    await con.query(sql)
}
createUserTable()

async function userExists(user) {
    let sql = `
        SELECT * FROM Users
        WHERE UserName=?
    `
    let cuser = await con.query(sql, [user.username])
    return cuser[0]
}

async function register(user) {
    let cuser = await userExists(user)
    if (cuser) throw Error("Username already in use!")

    let hashedPassword = await bcrypt.hash(user.password, 10)

    let sql = `
        INSERT INTO Users (FirstName, LastName, UserName, Password)
        VALUES (?, ?, ?, ?)
    `
    await con.query(sql, [user.firstName, user.lastName, user.username, hashedPassword])

    return await userExists(user)
}

async function login(user) {
    let cuser = await userExists(user)
    if (!cuser) throw Error("Username does not exist!")

    let match = await bcrypt.compare(user.password, cuser.Password)
    if (!match) throw Error("Password incorrect!")

    return cuser
}

async function getAllUsers() {
    let sql = `
        SELECT * FROM Users;
    `
    return await con.query(sql)
}

module.exports = { getAllUsers, register, login }