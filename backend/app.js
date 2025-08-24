import express from 'express';
import productRouter from './routes/productRoute.js';
import errorMiddleware from './middleware/error.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';


const app=express();

app.use(express.json());
app.use(cookieParser())

app.use("/api/v1",productRouter)
app.use("/api/v1",userRouter)

app.use(errorMiddleware)

export default app;

