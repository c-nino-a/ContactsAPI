const fetchPeople = require("../../services/dbService/fetchPeople")
const route = require("express").Router()
const cryptService = require("../../services/cryptService")

route
    .get('/', async(request, response) => {

        const contacts = await fetchPeople()
        contacts.forEach(contact => {
            contact.id = cryptService.encrypt(contact.id)
        })
        response.send({ contacts })
    })

module.exports = route