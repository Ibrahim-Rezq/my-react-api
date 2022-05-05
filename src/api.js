require('dotenv').config()
const express = require('express')
const serverless = require('serverless-http')
const Airtable = require('airtable-node')

const app = express()
const router = express.Router()
const airtable = new Airtable({ apiKey: process.env.API_KEY })
    .base('appk5qH312z6fZOBl')
    .table('react-app')

router.get('/products', async (req, res) => {
    const { records } = await airtable.list()
    const data = records.map((record) => {
        const { id } = record
        const {
            name,
            images,
            price,
            category,
            stars,
            company,
            featured,
            shipping,
            stock,
            reviews,
        } = record.fields
        return {
            id,
            name,
            image: images[0].url,
            price,
            category,
            company,
            featured,
            shipping,
        }
    })
    res.json([...data])
})

app.use(`/.netlify/functions/api`, router)

module.exports = app
module.exports.handler = serverless(app)

// "start": "NODE_ENV=development ./node_modules/.bin/netlify-lambda serve src",
// "build": "NODE_ENV=production ./node_modules/.bin/netlify-lambda build src"
