const express = require('express')
const dotend = require('dotenv').config()
const PORT = process.env.PORT || 5000

const app = express()

app.listen(PORT, () => {
    console.log(`Server started on port number: ${PORT}`)
})