import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';

import routes from './routes/index.js';

dotenv.config()

const app = express();
app.use(
    cors({
        origin: [
    "http://localhost:5173", 
    "https://project-manager-frontend-ten.vercel.app"
  ],
        methods:["GET","POST","PUT","DELETE"],
        allowedHeaders:["Content-Type","Authorization"],
    })
);

app.use(morgan('dev'));
//DB connection
mongoose.connect(process.env.MONGODB_URI).then(() => console.log("Db connected succefully."))
    .catch((err) => console.log("Failed to connect to DB:", err));


app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', async (req, res) => {
    res.status(200).json("welcome to taskhubn API");
});

//http://localhost:5000/api-v1/
app.use("/api-v1", routes);

//error middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ message: "internal server error" });
});

//not found middleare
app.use((req, res) => {
    res.status(404).json({ message: "route not found" });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
