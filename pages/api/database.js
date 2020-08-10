import { NextApiRequest, NextApiResponse } from 'next'

const pgp = require('pg-promise')({
    noWarnings: true,
    connect(client, dc, useCount) {
        const cp = client.connectionParameters;
        console.log('Connected to database:', cp.database);
    }
})

const db = pgp(`postgres://admin:aeriaforever@rds-mysql-aeria-mvp2.ccllphi2wcdu.us-east-1.rds.amazonaws.com:3306/admin`)
// postgres://jjgxrmao:bvXj-yOH69T-ylKR8SAPEwGubYakdenJ@raja.db.elephantsql.com:5432/jjgxrmao
//postgres://UserName:Password@Endpoint:5432/nameofdb
// db.func('version')
//     .then(data => {
//         // SUCCESS
//         data.version = 'PostgreSQL 9.5.1, compiled by Visual C++ build 1800, 64-bit'
//         console.log(data.version)
//     })
//     .catch(error => {
//         console.log(error)
//     });

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

// Endpoint



// // Port

// // 3306


// // PW: aeria4ever or aeriaforever