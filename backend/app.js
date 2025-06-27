import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';

// import connectDB from './config/db.js'; // Your DB connection logic
import { initializePassport } from './config/passport.config.js';
import mainApiRouter from './routes/index.js';
import { ApiResponse } from './utils/ApiResponse.js';

dotenv.config();
initializePassport(passport); // Pass the passport instance to our config

const app = express();

// Connect to Database
// connectDB();

// Core Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static("public"));

// --- Session Middleware ---
// Must come BEFORE passport middleware
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something stored
    store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URI,
        collectionName: 'sessions' 
    }),
    cookie: {
        maxAge: THIRTY_DAYS,
    }
}));

// --- Passport Middleware ---
app.use(passport.initialize());
app.use(passport.session()); // To use persistent login sessions

// API Routes
app.use('/api', mainApiRouter);


// Server Start
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running at http://localhost:${PORT}`);
});




// server.js
