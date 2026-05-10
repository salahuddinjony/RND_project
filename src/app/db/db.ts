import mongoose from 'mongoose'
import config from '../config/index.js'

// declare a variable to hold the connection promise
let connectionPromise: Promise<typeof mongoose> | null = null

export const connectToDatabase = async () => {
  // if the connection is already established, return the connection
  if (mongoose.connection.readyState === 1) {
    return mongoose 
  }

  if (!config.MONGO_URI) {
    throw new Error('MONGO_URI is not set ')
  }

  // if the connection is not established, create a new connection
  if (!connectionPromise) {
    connectionPromise = mongoose.connect(config.MONGO_URI)
  }

  // return the connection promise
  return connectionPromise
}
