const express = require('express')
const User = require('../models/user')
const router = express.Router()

router.get('/getAllUsers', async (req, res) => {
    try {
        const users = await User.getAllUsers()
        res.send(users)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

router.post('/register', async (req, res) => {
    try {
        const user = await User.register(req.body)
        res.send({...user, Password: undefined})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.login(req.body)
        res.send({...user, Password: undefined})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

router.put('/updateUser', async (req, res) => {
    try {
        await User.updateUser(req.body)
        res.send({message: 'user updated successfully'})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

router.delete('/deleteUser/:userID', async (req, res) => {
    try {
        await User.deleteUser(req.params.userID)
        res.send({message: 'user deleted successfully'})
    } catch (err) {
        res.status(401).send({message: err.message})
    }
})

module.exports = router