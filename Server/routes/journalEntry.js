const express = require('express')
const JournalEntry = require('../models/journalEntry')
const router = express.Router()

router.get('/getAllEntries', async (req, res) => {
    try {
        const entries = await JournalEntry.getAllEntries()
        res.send(entries)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

router.post('/createEntry', async (req, res) => {
    try {
        await JournalEntry.createEntry(req.body)
        res.send({message: 'Entry created successfully'})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

router.put('/updateEntry', async (req, res) => {
    try {
        await JournalEntry.updateEntry(req.body)
        res.send({message: 'Entry updated successfully'})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

router.delete('/deleteEntry/:entryID', async (req, res) => {
    try {
        await JournalEntry.deleteEntry(req.params.entryID)
        res.send({message: 'Entry deleted successfully'})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router