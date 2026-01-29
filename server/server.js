import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './configs/db.js';
import {clerkMiddleware} from '@clerk/express' // Removed 'Client' from here
import {serve} from 'inngest/express';
import {inngest, functions} from "./inngest/index.js"

const app = express();
const port = 3000;
await connectDB()

//middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())

// api routes
app.get('/', (req, res) => res.send("Server Is live"));
app.use('/api/inngest', serve({client: inngest, functions})) // 'client' should be lowercase

app.listen(port, () => console.log(`Server is running on port ${port}`));