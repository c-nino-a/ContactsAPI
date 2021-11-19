const dbPool = require('./dbPool')
const { v4: uuidv4 } = require('uuid')

module.exports = async({ firstname, lastname, id, emailaddresses, postaladdresses }) => {

    let db = null;
    try {
        const db = await dbPool.connect()
        await db.query('BEGIN')


        if (typeof emailaddresses === 'string') {
            emailaddresses = [emailaddresses]
        }
        if (postaladdresses == undefined) {
            postaladdresses = [];
        }


        if (id == "") {
            id = uuidv4();
            await db.query(
                `INSERT INTO people (firstname,lastname,emailaddresses,p_id) 
                VALUES ($1,$2,$3,$4)`, [firstname, lastname, emailaddresses, id]
            )

            postaladdresses.forEach(async pa => {
                pa_id = uuidv4();

                await db.query(

                    `INSERT INTO postaladdresses (street, city, zipcode,p_id,pa_id) VALUES ($1,$2,$3,$4,$5) `, [pa.street, pa.city, pa.zipcode, id, pa_id]

                )
            })
        } else {
            await db.query(
                `UPDATE people SET firstname = $1, lastname = $2, emailaddresses = $3
                WHERE p_id = $4`, [firstname, lastname, emailaddresses, id]
            )
            const pa_ids = postaladdresses.filter(i => !!i.id && i.id != "").map(i => `'${i.id}'`).join(',');
            if (pa_ids.length > 0) {
                await db.query(
                    `DELETE FROM postaladdresses WHERE pa_id NOT IN (${pa_ids}) AND p_id = '${id}'`
                );
            } else {
                await db.query(
                    `DELETE FROM postaladdresses WHERE p_id = '${id}'`
                );
            }
            postaladdresses.forEach(postaladdress => {
                if (postaladdress == "") {
                    console.log("Empty Postal Address");
                    return;
                }
                if (postaladdress.id == "" || !postaladdress.id) {
                    pa_id = uuidv4();
                    db.query(`INSERT INTO postaladdresses(street, city, zipcode, p_id, pa_id) VALUES ($1, $2, $3, $4, $5)`, [postaladdress.street, postaladdress.city, postaladdress.zipcode, id, pa_id])
                } else {
                    db.query(
                        `UPDATE postaladdresses SET street = $1, city = $2, zipcode = $3
                        WHERE pa_id = $4`, [postaladdress.street, postaladdress.city, postaladdress.zipcode, postaladdress.id]
                    )
                }

            });
        }
        await db.query('COMMIT');
    } catch (err) {

        console.log(err)
        await db.query('ROLLBACK')

    } finally {
        if (db) db.release()
    }


}