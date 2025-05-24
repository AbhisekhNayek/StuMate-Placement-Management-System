import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.config.js';

// Import Routes
import userRoutes from './Routes/user.route.js';
import studentRoutes from './Routes/student.route.js';
import tpoRoutes from './Routes/tpo.route.js';
import managementRoutes from './Routes/management.route.js';
import superuserRoutes from './Routes/superuser.route.js';
import companyRoutes from './Routes/company.route.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Static File Serving
app.use('/profileImages', express.static(path.join(path.resolve(), 'public/profileImages')));
app.use('/resume', express.static(path.join(path.resolve(), 'public/resumes')));
app.use('/offerLetter', express.static(path.join(path.resolve(), 'public/offerLetter')));

// Database Connection
connectDB();

app.get('/', (req, res)=>{
  res.send('Welcome To StuMate Backend')
})

// Routes
app.use('/user', userRoutes);
app.use('/student', studentRoutes);
app.use('/tpo', tpoRoutes);
app.use('/management', managementRoutes);
app.use('/admin', superuserRoutes);
app.use('/company', companyRoutes);

// Start Server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is Running at Port : ${port}`);
});
