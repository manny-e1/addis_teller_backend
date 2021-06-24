import dotenv from 'dotenv'
import connectDatabase from './config/db.js'
import express from 'express'
import cors from 'cors'

import { notFound, errorHandler } from './middlewares/error.js'

import userRoutes from './routes/userRoutes.js'
import baseRoute from './routes/baseRoute.js'
import postRoute from './routes/postRoute.js'
import stationRoute from './routes/stationRoute.js'

dotenv.config()

connectDatabase()

const app = express()
app.use(cors())
app.use(express.json())


app.use('/users', userRoutes)
app.use('/', baseRoute)
app.use('/posts', postRoute)
app.use('/stations', stationRoute)


app.use(notFound)
app.use(errorHandler)


const port = process.env.PORT || 5002

app.listen(port, console.log(`server listening on port ${port}`))