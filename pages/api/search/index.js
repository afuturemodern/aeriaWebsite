import { db } from '../database';
import escape from 'sql-template-strings';

//needs to take in information from search bar
//check if string from search bar is in database
//turn string from search bar with
console.log('db -->', db)
export default async (req, res) => {
    try {
        // console.log(req.body, `SELECT * FROM songs_spotify WHERE artists = 'Dua lipa'`)
        console.log('in search api')
        console.log('req', req)
        console.log('req.body.headers.q', req.body.headers.q)
        const qResults = await db.query(`SELECT * FROM songs_spotify WHERE artists = "${req.body.headers.q}"`)
        await db.end()
        console.log(qResults);
        res.status(200).json(qResults)
        return
    } catch(err) {
        return console.log(error)
    }
}