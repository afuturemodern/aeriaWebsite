import db from '../../../lib/db';
import escape from 'sql-template-strings';



export default async (req, res) => {
    const qResults = await db.query(escape`
        SELECT * FROM songs
        `)
    console.log(qResults);
    res.status(200).json(qResults)
    return
}