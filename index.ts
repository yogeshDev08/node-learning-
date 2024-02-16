import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import connectDB from './server/database/connection';
import route from './server/routes/router';

const app = express();

/**
 * @param {* Enable CORS (Cross-Origin Resource Sharing) middleware } 
 */
app.use(cors());

/**
 * @param {* Load environment variables from the 'config.env' file } 
 */
dotenv.config({ path: 'config.env' });

/**
 * @param {* Define the port on which the server will run }  
 */
const PORT: number = parseInt(process.env.PORT as string, 10) || 8080;

app.use(morgan('tiny'));

connectDB();

/**
 * @param {* Parse URL-encoded and JSON-encoded bodies of incoming requests }  
 */
app.use(bodyParser.urlencoded({ extended: false }), bodyParser.json());

/**
 * @param {* Load the routes from the 'router.ts' file }  
 */
app.use('/', route);

/**
 * @param {* Parse JSON bodies of incoming requests }  
 */
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
