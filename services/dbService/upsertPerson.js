const db = require('./dbPool')

module.exports = async({ firstname, lastname, id }) => {

    const toInsert = !id

    if (toInsert) {
        await db.query(
            `INSERT INTO people (firstname,lastname) 
            VALUES ($1,$2)`, [firstname, lastname]
        )
        return

    }

    await db.query(

        `UPDATE people SET firstname=$1, lastname=$2 WHERE id=$3`, [firstname, lastname, id]

    )
}