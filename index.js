const express = require('express')
const morgan = require('morgan')

const port = 3000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.send('Hello world!')
})

app.listen(port, () => {
    console.log('App listening on port: ${port}')
})  