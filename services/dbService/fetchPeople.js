const db = require('./dbPool')

module.exports = async() => {

    const query = await db.query(
        'SELECT p_id id, firstname, lastname FROM people ORDER BY firstname asc '
    )

    const result = query.rows

    return result
}