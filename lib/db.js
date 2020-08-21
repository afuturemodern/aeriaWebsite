
// import { NextApiRequest, NextApiResponse } from 'next'
// import mysql from 'serverless-mysql'
// /**
//  * db.js connects to the database and returns a table object
//  * 
//  * @var {object} db connects to the MySQL database 
//  */

// const db = mysql({
//     config: {
//         host: process.env.HOST,
//         database: process.env.DATABASE,
//         user: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//     }
// })

// export default async query => {
//     try {
//         console.log('inside db query function db.js')
//         const results = await db.query(query);
//         await db.end();
//         console.log(results);
//         return results
//     } catch (error) {
//         return { error }
//     }
// }