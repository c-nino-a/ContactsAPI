const db = require('./dbPool')

module.exports = async id => {

    const query = await db.query(
        `DELETE FROM people WHERE id=$1`, [id]
    )

    return query
}