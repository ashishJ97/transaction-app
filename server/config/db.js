import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

export const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Database connected successfully.')
  } catch (error) {
    console.log('Error connecting to database.')
    process.exit(1)
  }
}
