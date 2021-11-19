const { response } = require('express')
require('dotenv').config()
const cryptService = require('./services/cryptService')
const express = require('express')
const fetchPeople = require('./services/dbService/fetchPeople')
const server = express()



server
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .set('view engine', 'ejs')
    .use(express.static('public'))


.listen(3001, () => {
    console.log("server running")
})

require('./services/routeService')(server)
server.locals.functions = {
    encrypt: val => {
        return cryptService.encrypt(val)
    }
}