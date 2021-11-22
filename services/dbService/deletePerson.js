const dbPool = require('./dbPool')

module.exports = async (id) => {
    let db=null;
    try {

        const db = await dbPool.connect()

        await db.query("BEGIN")

        await db.query(

            `DELETE FROM people WHERE p_id='${id}'`
        )

        await db.query(

            `DELETE FROM postaladdresses WHERE p_id='${id}'`
        )

        await db.query("COMMIT");
    } catch (error) {

        console.log(error);

        await db?.query("ROLLBACK");

    } finally {

        db?.release();
    }
}