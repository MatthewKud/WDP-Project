const { con, query } = require('./db_connect');

async function createJournalEntryTable() {
    let sql = `CREATE TABLE IF NOT EXISTS Journal_Entry (
        EntryID INT NOT NULL AUTO_INCREMENT,
        Content TEXT NOT NULL,
        DateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
        UserID INT NOT NULL,
        CategoryID INT NOT NULL,
        CONSTRAINT pk_Journal_Entry PRIMARY KEY (EntryID),
        CONSTRAINT fk_Users FOREIGN KEY (UserID) REFERENCES Users(UserID),
        CONSTRAINT fk_Category FOREIGN KEY (CategoryID) REFERENCES Category(CategoryID)
    )`;
    await query(sql);
}
createJournalEntryTable();

async function getAllEntries() {
    let sql = `SELECT * FROM Journal_Entry;`
    return await query(sql)
}

module.exports = { getAllEntries }