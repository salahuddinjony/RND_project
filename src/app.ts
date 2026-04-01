import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
const app = express()

// Middleware 
app.use(express.json())
app.use(cors())

const userRouter = express.Router()
app.use('/api/users', userRouter)



// Routes
userRouter.get('/:userId/:name', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(
        {
            'success': true,
            'message': 'Welcome to the API',
            'params': req.params

        })
        // res.send(abc);

    } catch (error) {
        console.error('Error in user route:', error);
        next(error); // Pass the error to the global error handler
    }
})


// 404 handler for undefined routes
app.use((req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(404).json(
            {
                success: false,
                message: 'Route not found'
            })

    } catch (error) {
        console.error('Error in 404 handler:', error);
        next(error); // Pass the error to the global error handler
    }
})

//global error handler
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Global error handler:', error)
    res.status(500).json(
        {
            success: false,
            message: 'Internal Server Error'
        })
})
export default app
