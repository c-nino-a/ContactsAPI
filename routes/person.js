const { request } = require('express')

const route = require('express').Router()

route
    .get('/:firstname/:lastname', function(request, response) {

        const { firstname, lastname } = request.params

        const json = { firstname, lastname }

        response.render("person", json)
    })
    .post('/', (request, response) => {

        const { body } = request
        const { firstname, lastname } = body

        response.send(`Hello ${firstname} ${lastname}`)



    })

module.exports = route