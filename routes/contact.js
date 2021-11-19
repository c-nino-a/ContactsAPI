const fetchPerson = require('../services/dbService/fetchPerson.js')
const upsertPerson = require('../services/dbService/upsertPerson.js')
const deletePerson = require('../services/dbService/deletePerson.js')
const route = require('express').Router()
const cryptService = require('../services/cryptService')
const decryptIdMid = require('../services/middleware/decryptIdMid')

route
    .get('/new', async(request, response) => {
        response.render("person", {
            id: null,
            firstname: null,
            lastname: null,
            emailaddresses: null,
            postaladdresses: null
        })

    })


    .get('/:id',decryptIdMid, async (request,response)=>{
    const { id } = request.params
    const data = await fetchPerson(id)
    response.render("person", data)

})

.delete('/:id', async(request, response) => {

    const { id } = request.params
    await deletePerson(id)
    response.sendStatus(204)

})

.post('/', async(request, response) => {

    await upsertPerson(request.body)
    response.end()

})

module.exports = route