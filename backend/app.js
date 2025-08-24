import express from 'express';
import productRouter from './routes/productRoute.js';
import errorMiddleware from './middleware/error.js';


const app=express();

app.use(express.json());

app.use("/api/v1",productRouter)

app.use(errorMiddleware)

export default app;

