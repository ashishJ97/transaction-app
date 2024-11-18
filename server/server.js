import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectToDatabase } from './config/db.js'
import { router as transactionRoutes } from './routes/transaction.route.js'

dotenv.config()
connectToDatabase()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())
app.use('/api', transactionRoutes)

app.listen(port, () => console.log(`Server started on port: ${port}`))
