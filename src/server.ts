import config from './app/config/index.js'
import app from './app.js'
import { connectToDatabase } from './app/db.js'

// Connect to MongoDB
async function initializeDatabase() {


    try {
        await connectToDatabase()
        console.log('Connected to MongoDB')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
        throw error
    }
}
// Start the server
async function startServer() {
    try {
        app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`)
        })
    } catch (error) {
        console.error('Errsasssaor starting server:', error)
    }
}

// Main function to connect to database and start the server
async function main() {
    try {
        await initializeDatabase()
        await startServer()
    } catch (error) {
        console.error('Application startup failed:', error)
        process.exit(1) // Exit the process with a failure code
    }
}

// Run the main function
main()


