const express = require('express')
const path = require('path')
const app = express()

app.use((req, res, next) => {
    console.log('incoming request:', req.method, req.url)
    next()
})

app.use(express.json())
app.use(express.static(__dirname + '/Public'))

const userRoutes = require('./server/routes/user')
const categoryRoutes = require('./server/routes/category')
const journalEntryRoutes = require('./server/routes/journalEntry')

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
    next();
});

app.use('/users', userRoutes)
app.use('/categories', categoryRoutes)
app.use('/journalEntries', journalEntryRoutes)

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '/Public/login.html')))

const PORT = 3500
app.listen(PORT, () => console.log(`Server started on port ${PORT}!!`))