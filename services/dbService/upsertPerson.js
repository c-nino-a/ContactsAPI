const db = require('./dbPool')

module.exports = async({ firstname, lastname, id, emailaddresses }) => {

    if (typeof emailaddresses === 'string') {

        emailaddresses = [emailaddresses]
    }

    const toInsert = !id

    if (toInsert) {
        await db.query(
            `INSERT INTO people (firstname,lastname,emailaddresses) 
            VALUES ($1,$2,$3)`, [firstname, lastname, emailaddresses]
        )
        return

    }

    await db.query(

        `UPDATE people SET firstname=$1, lastname=$2, emailaddresses=$4 WHERE id=$3`, [firstname, lastname, id, emailaddresses]

    )
}