const db = require('./dbPool')

module.exports = async() => {

    const query = await db.query(
        'SELECT p_id id, firstname, lastname FROM people '
    )

    const result = query.rows

    return result
}