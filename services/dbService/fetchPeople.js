const db = require('./dbPool')

module.exports = async() => {

    const query = await db.query(
        'SELECT id, firstname, lastname FROM people ORDER BY id'
    )

    const result = query.rows

    return result
}