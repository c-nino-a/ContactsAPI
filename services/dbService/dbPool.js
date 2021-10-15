const { Pool } = require('pg')

const db = new Pool({
    database: 'contacts',
    user: "postgres",
    host: 'localhost',
    password: 'arigatogu',
    port: '5432'
})

module.exports = db