import app from './app.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config({
    path:"./config/config.env"
});

const port=process.env.PORT || 8000;

connectDB();

app.get("/",(req,res)=>{
    res.send("Hello World");
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})