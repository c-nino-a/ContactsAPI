const dbPool = require('./dbPool')

module.exports = async({ firstname, lastname, id, emailaddresses, postaladdresses }) => {

    let db = null;
    try {
        const db = await dbPool.connect()
        await db.query('BEGIN')

        if (typeof emailaddresses === 'string') {
            emailaddresses = [emailaddresses]
        }

        const toInsert = !id

        if (toInsert) {
            await db.query(
                `INSERT INTO people (firstname,lastname,emailaddresses) 
                VALUES ($1,$2,$3)`, [firstname, lastname, emailaddresses]
            )

        } else {
            await db.query(

                `UPDATE people SET firstname=$1, lastname=$2, emailaddresses=$4 WHERE id=$3`, [firstname, lastname, id, emailaddresses]

            )
        }

        postaladdresses.forEach(async pos => {
            pa = pos

            if (!pa.id) {
                await db.query(

                    `INSERT INTO postaladdresses (street, city, zipcode,p_id) VALUES ($1,$2,$3,$4) `, [pa.street, pa.city, pa.zipcode, id]
                )
            } else {

                console.log(pa[id])
                console.log(pa[street])
                await db.query(

                    `UPDATE postaladdresses SET street=$2, city=$3, zipcode=$4 WHERE id=$1`, [pa.id, pa.street, pa.city, pa.zipcode]
                )
            }
        })
        await db.query('COMMIT')
    } catch (err) {

        console.log(err)
        await db.query('ROLLBACK')

    } finally {
        if (db) db.release()
    }


}