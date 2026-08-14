import path from 'node:path';
import fs from 'node:fs';
import cors from 'cors';
import express from 'express';
import { error } from 'node:console';
import { productController, salesController, supplierController ,reportsController} from './modules/index.js';
import{errorResponse} from './middleware/index.js';
const app = express();
const port = 3000;
import { db, startServer } from './DB/DB.js';
app.use(cors(), express.json());
startServer(app, port);
app.all('/', (req, res, next) => {
    res.status(200).json({ message: 'welcome to BE server' });
})
app.use('/product', productController);
app.use('/sales', salesController);
app.use('/supplier', supplierController);
app.use('/report', reportsController);


app.all('{/*dummy}', (req, res, next) => {
    res.status(404).json({ message: 'invalid routing' });
})
app.use(errorResponse);
