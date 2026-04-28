const express = require('express');
const JournalEntry = require('../models/journalEntry');
const router = express.Router();

router.get('/getAllEntries', async (req, res) => {
    try {
        const entries = await JournalEntry.getAllEntries()
        res.send(entries)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
});

module.exports = router;