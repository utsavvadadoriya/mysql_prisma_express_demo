import express from 'express'
import dotenv from 'dotenv'
import routes from './route/index.js'
dotenv.config()
const app = express()
const port = process.env.PORT || 5001
app.use(express.json())
app.use('/api',routes)
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))