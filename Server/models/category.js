const { con, query } = require('./db_connect');

async function createCategoryTable() {
    let sql = `CREATE TABLE IF NOT EXISTS Category (
        CategoryID INT NOT NULL AUTO_INCREMENT,
        CategoryName VARCHAR(255) NOT NULL,
        CONSTRAINT pk_Category PRIMARY KEY (CategoryID)
    )`;
    await query(sql);
}
createCategoryTable();

async function getAllCategories() {
    let sql = `SELECT * FROM Category;`
    return await query(sql)
}

module.exports = { getAllCategories }