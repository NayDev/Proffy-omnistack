import express from 'express';
import path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({ path: path.resolve('src/config/config.env') });
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log('Server running on port 3333'));