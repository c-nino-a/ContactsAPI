const deletePeople = require('../services/dbService/deletePerson')
const fetchPeople = require('../services/dbService/fetchPeople')
const route = require('express').Router()
const decryptIdMid = require('../services/middleware/decryptIdMid')
const addPeople = require('../services/dbService/addPerson')


route
    .get('/', async(request, response) => {

        const contacts = await fetchPeople()

        // response.render('home', { contacts })
        response.render("home", { contacts })
    })
    .delete('/delete/:id', decryptIdMid, async(request, response) => {

        id = request.params.id;
        await deletePerson(id);
        response.sendStatus(204);
    })
    .post('/addContact', async(request, response) => {

        var firstname = request.body.firstname;
        var lastname = request.body.lastname;
        await addPeople(firstname, lastname);
        const contacts = await fetchPeople()

        response.render("home", { contacts })
    })

module.exports = route