const con = require('./db_connect');

async function createCategoryTable() {
    let sql = `
        CREATE TABLE IF NOT EXISTS Category (
            CategoryID INT NOT NULL AUTO_INCREMENT,
            CategoryName VARCHAR(255) NOT NULL,
            CONSTRAINT pk_Category PRIMARY KEY (CategoryID)
        );
    `
    await con.query(sql)
}
createCategoryTable()

async function getAllCategories() {
    let sql = `
        SELECT * FROM Category;
    `
    return await con.query(sql)
}

async function getCategoryByName(categoryName) {
    let sql = `
        SELECT * FROM Category
        WHERE CategoryName = ?
    `
    let result = await con.query(sql, [categoryName])
    return result[0]
}

async function createCategory(category) {
    let existing = await getCategoryByName(category.categoryName)
    if (existing) return existing

    let sql = `
        INSERT INTO Category (CategoryName)
        VALUES (?)
    `
    await con.query(sql, [category.categoryName])
    return await getCategoryByName(category.categoryName)
}

module.exports = { getAllCategories, createCategory, getCategoryByName }