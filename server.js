const { response } = require('express')

var express = require('express')
var server = express()
const { Pool } = require('pg')

const db = new Pool({
    database: 'contacts',
    user: "postgres",
    host: 'localhost',
    password: 'arigatogu',
    port: '5432'
})

server
    .set('view engine', 'ejs')
    .use(express.static('public'))

.get('/contacts', async(request, response) => {

    const query = await db.query(
        'SELECT * FROM people'
    )

    const contacts = query.rows

    response.render("home", { contacts })
})

.get('/person/firstname/lastname', function(request, response) {

    const { firstname, lastname } = request.params

    const json = (firstname, lastname)

    response.render("home", json)
})

.listen(3000, () => {
    console.log("server running")
})