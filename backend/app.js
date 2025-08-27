import express from 'express';
import productRouter from './routes/productRoute.js';
import errorMiddleware from './middleware/error.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import orderRouter from './routes/orderRoute.js';
import cors from 'cors';


const app=express();


app.use(
    cors({
      origin: [
        "https://sika-jade.vercel.app",
        "http://localhost:5173"
      ],
      credentials: true,
    })
  );
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Handle multipart/form-data for file uploads
app.use(express.raw({ type: 'multipart/form-data', limit: '50mb' }));

// Routes
app.use("/api/v1", productRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", orderRouter);

app.use(errorMiddleware)

export default app;

