const express = require('express')
const morgan = require('morgan')
const router = require('./routers/index.router')

const port = 3000
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan("dev"))

app.use(router)

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})  