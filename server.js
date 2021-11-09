const { response } = require('express')

const express = require('express')
const fetchPeople = require('./services/dbService/fetchPeople')
const server = express()



server
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .set('view engine', 'ejs')
    .use(express.static('public'))


.listen(3000, () => {
    console.log("server running")
})

require('./services/routeService')(server)