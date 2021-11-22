const db = require("./dbPool")



module.exports = async(id) => {
    const query = await db.query(
        `SELECT p.p_id id, p.firstname, p.lastname, p.emailaddresses, 
        json_agg(
            json_build_object(
                'id', pa.pa_id,
                'street', pa.street,
                'city', pa.city,
            'zipcode', pa.zipcode
            )
        )
        

        postaladdresses
        
        FROM people as p
        
        LEFT JOIN postaladdresses as pa

        ON pa.p_id = p.p_id
        
        
        WHERE p.p_id=$1
        
        GROUP BY p.p_id, p.firstname, p.lastname, p.emailaddresses
        
        `, [id]


    )

    const result = query.rows[0]

    return result

}