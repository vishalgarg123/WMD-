// Import the express library and relevant types for Request and Response
import express, { Request, Response } from 'express'; 
//Import the  all routes like user,transaction & wallet
import userRoutes from "./routes/user-route"
import transactionRoutes from "./routes/transaction-route"
import walletRoutes from "./routes/wallet-route"
//Import the bodyparser
import bodyParser from 'body-parser';
// Import the database connection function
import connectDB from './config/db';
// Import dotenv to load environment variables from .env file
import dotenv from 'dotenv';
//import the cors middleware
import cors from "cors"

// Load environment variables from the .env file
dotenv.config();

// Create an instance of the Express application
const app = express(); 

// Connect to MongoDB using the connectDB function
connectDB();

// Middleware to parse incoming JSON requests (built-in in Express)
app.use(express.json()); 

// Middleware for URL-encoded form data
app.use(express.urlencoded({ extended: true })); 
//middlewares
app.use(bodyParser.json())
//cors configuration- allow requests from all domains
 app.use(cors())

 // Optionally, you can configure CORS for specific domains as shown below:
/* const corsOptions:cors.CorsOptions = {
  origin: ['http://localhost:3000', 'http://example.com'], // Allow these domains
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true, // Allow credentials (e.g., cookies)
};
app.use(cors(corsOptions)); */

//Routes
app.use('/api/auth',userRoutes) //authentication routes
app.use('/api/transactions',transactionRoutes)//transaction routes
app.use('/api/wallets',walletRoutes)   //wallet routes


// Define a route for the root URL ('/') using a GET request
/* app.get('/', (req: Request, res: Response) => {
  // Send a simple response when the root URL is accessed
  res.send('Hello, TypeScript with Express!'); 
});
 */
// Export the app instance for use in other modules (like your server entry point)
export default app;
