const db = require('./dbPool')

module.exports = async() => {

    const query = await db.query(
        'SELECT * FROM people'
    )

    const result = query.rows

    return result
}