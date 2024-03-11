const express = require('express')
const bodyParser = require('body-parser')

const app = express();

const { PORT } = require('./config/server-config')

const serverSetUp = () => {

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))

    app.listen(PORT, async () => {
        console.log(`Server started at port ${PORT}`)
    })
}

serverSetUp();