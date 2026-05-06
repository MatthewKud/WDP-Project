const con = require('./db_connect');

async function createJournalEntryTable() {
    let sql = `
        CREATE TABLE IF NOT EXISTS Journal_Entry (
            EntryID INT NOT NULL AUTO_INCREMENT,
            Content TEXT NOT NULL,
            DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
            UserID INT NOT NULL,
            CategoryID INT NOT NULL,
            CONSTRAINT pk_Journal_Entry PRIMARY KEY (EntryID),
            CONSTRAINT fk_Users FOREIGN KEY (UserID) REFERENCES Users(UserID),
            CONSTRAINT fk_Category FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
        );
    `
    await con.query(sql)
}
createJournalEntryTable()

async function getAllEntries() {
    let sql = `
        SELECT * FROM Journal_Entry;
    `
    return await con.query(sql)
}

async function createEntry(entry) {
    let sql = `
        INSERT INTO Journal_Entry (Content, UserID, CategoryID)
        VALUES (?, ?, ?)
    `
    await con.query(sql, [entry.content, entry.userID, entry.categoryID])
}

async function updateEntry(entry) {
    let sql = `
        UPDATE Journal_Entry
        SET Content = ?, CategoryID = ?
        WHERE EntryID = ?
    `
    await con.query(sql, [entry.content, entry.categoryID, entry.entryID])
}

async function deleteEntry(entryID) {
    let sql = `
        DELETE FROM Journal_Entry
        WHERE EntryID = ?
    `
    await con.query(sql, [entryID])
}

module.exports = { getAllEntries, createEntry, updateEntry, deleteEntry }