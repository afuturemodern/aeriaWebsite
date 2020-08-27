require('dotenv').config()

module.exports = {
    env: {
        HOST: process.env.DB_HOST,
        DATABASE: process.env.DATABASE,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        API_CALL: process.env.API_CALL,
    }
}