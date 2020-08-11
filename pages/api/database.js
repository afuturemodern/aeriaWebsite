
import { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'serverless-mysql'
// USING MYSQL
//declare mysql db

const db = mysql({
    config: {
        host: process.env.HOST,
        database: process.env.DATABASE,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
    }
})


const selectAllquery = 'SELECT * from songs'

export default async (req, res) => {
    try {
        const results = await db.query(selectAllquery)
        await db.end()
        // console.log(results)
        res.status(200).json(results)
        return
    } catch (error) {
        return console.log(error)
    }
}
