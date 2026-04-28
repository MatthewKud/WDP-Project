const express = require('express');
const Category = require('../models/category');
const router = express.Router();

router.get('/getAllCategories', async (req, res) => {
    try {
        const categories = await Category.getAllCategories()
        res.send(categories)
    } catch (err) {
        res.status(401).send({message: err.message})
    }
});

module.exports = router;