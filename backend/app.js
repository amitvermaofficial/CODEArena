import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import HomeRoute from './src/routes/home.route.js';
import ProblemsRoute from './src/routes/problems.route.js';
import UserProfileRoute from './src/routes/userProfile.route.js';
import AdminProfileRoute from './src/routes/adminProfile.route.js';
import connectDB from "./src/config/mongo.config.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', HomeRoute);
app.use('/problems', ProblemsRoute);
app.use('/user/profile/:id', UserProfileRoute);
app.use('/admin/profile/:id', AdminProfileRoute);

// Server Start
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
