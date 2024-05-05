import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import multer from 'multer';
import authRoute from './Routes/auth.js';
import userRoute from './Routes/user.js';
import doctorRoute from './Routes/doctor.js';
import reviewRoute from './Routes/review.js';

dotenv.config()

const app = express()
const port = process.env.PORT || 8000
//--------------images -----------------------------------
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder for uploaded files
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        // Set the filename for uploaded files
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

//------------------------------


const corsOptions={
    origin:true
}
app.get('/',(req,res)=>{
    res.send('Api is Working ')
})


//database conn

mongoose.set('strictQuery',false)
const connectDB=async()=>{
    try{
        mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        })
        console.log('MongoDb database is connected')
     } catch(error){
            console.log('Mongodb database is connection failed')
        }
    }


// middleWare
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/users',userRoute);
app.use('/api/v1/doctors',doctorRoute);
app.use('/api/v1/reviews',reviewRoute);


app.listen(port,()=>{
    connectDB();
    console.log(`Server is running on port ${port}`);
})