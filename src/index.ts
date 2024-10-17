import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

import path from 'path';
import routes from './routes/index';

const app = express();
const port = 3000;


mongoose.connect(process.env.MONGO_URI!).catch((error) => {
    console.log(error);
});
app.use(cors(
    {
        origin: '*',        
    }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'views')));
app.get("/", (_req: Request, res: Response)=>{
    res.send("Welcome to Server");
});
app.use(routes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});