import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config({
    path:"./config/config.env"
});

const port=process.env.PORT || 8000;

connectDB();

process.on("uncaughtException",(err)=>{
    console.error("Uncaught Exception:", err.message);
    server.close(()=>{
        process.exit(1);
    });
});

app.get("/",(req,res)=>{
    res.send("Hello World");
})

const server=app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})

process.on("unhandledRejection",(err)=>{
    console.error("Unhandled Rejection:", err.message);
    server.close(()=>{
        process.exit(1);
    });
});
