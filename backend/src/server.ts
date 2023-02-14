import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import cors from 'cors'

import connectdb from './utilites/connectdb'
import router from './routes/main'
import errorHandler from './middlewares/error'

dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.resolve('public')))
app.use(cors())
app.use(router)
app.use(errorHandler)

const port = process.env.PORT || '2018'
app.listen(port, async () => {
  await connectdb()
})
