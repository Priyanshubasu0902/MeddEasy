import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose';
import "dotenv/config"
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRoutes from './routes/userRoutes.js'
import appointmentRoutes from './routes/appointmentRoutes.js'
import prescriptionRoutes from './routes/prescriptionRoutes.js'
import readingRoutes from './routes/readingRoutes.js'
import testResultRoutes from './routes/testResultRoutes.js'
import doctorRoutes from './routes/doctorRoutes.js'

const app = express();
const PORT = process.env.PORT || 5000

await connectDB();
await connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.get('/', (req, res)=> {
   res.send("api working");
})

app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/readings', readingRoutes);
app.use('/api/testResults', testResultRoutes);
app.use('/api/doctors', doctorRoutes);

app.listen(PORT, (err) => {
   if(err) return console.log(err.message);
   console.log(`Server is running at PORT: ${PORT}`)
} )