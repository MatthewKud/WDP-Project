const express = require('express')
const app = express()

const userRoutes = require('./server/routes/user')
const categoryRoutes = require('./server/routes/category')
const journalEntryRoutes = require('./server/routes/journalEntry')

app.use(express.json())

// CORS middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
});

app.use('/users', userRoutes)
app.use('/categories', categoryRoutes)
app.use('/journalEntries', journalEntryRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started on port ${PORT}!!`))