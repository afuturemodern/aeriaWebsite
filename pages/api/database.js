import { NextApiRequest, NextApiResponse } from 'next'

// USING MYSQL INSTEAD OF POSTGRES

const pgp = require('pg-promise')({
    noWarnings: true,
    connect(client, dc, useCount) {
        const cp = client.connectionParameters;
        console.log('Connected to database:', cp.database);
    }
})

// const db = pgp(``)


export default async (req, res) => {
    // res.json({ hello: 'world' })
    try {
        console.log('entered db endpoint')
        // const { name, price, imageUrl, description } = req.query

        // if (!name || !price || !imageUrl || !description) {
        //     return res.status(422).send({ error: ['Missing one or more fields'] })
        // }

        const product = await db.func('SELECT * FROM songs')
        console.log('product of query', product)
        res.status(200).json(product)

    } catch (error) {
        // console.error(error);
        res.status(500).send({ message: ["Error creating on the server"], error: error })
    }
}
