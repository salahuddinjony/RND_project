import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { globalErrorHandler, notFoundHandler } from './app/middleware/GlobalErrorHandler/error.handler.js'
import rootRoute from './app/utils/server_check/initial.route.js'
import router from './app/routes/index.js'

// Create an instance of the Express application
const app = express()

// Middleware 
app.use(express.json()) // Middleware to parse JSON request bodies
app.use(cors()) // Middleware to enable Cross-Origin Resource Sharing (CORS) for handling requests from different origins

//application all routes
app.use('/api/v1', router)


// Root route-test
app.get('/', rootRoute)

// 404 handler for undefined routes
app.use(notFoundHandler)
//global error handler
app.use(globalErrorHandler)


export default app
