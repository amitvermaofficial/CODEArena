import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { join } from "path";

import connectDB from './src/config/db.js'; // Your DB connection logic
import { initializePassport } from './src/config/passport.config.js';

import mainApiRouter from './src/routes/routes.js';
import { ApiResponse } from './src/utils/ApiResponse.js';

dotenv.config();
initializePassport(passport); // Pass the passport instance to our config

const app = express();
const __dirname = join(import.meta.dirname, '..'); 
const PORT = process.env.PORT || 3000;

// Cors Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static(join(__dirname, "public")));

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

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            data: err.data
        });
    } else {
        console.error(err); // Log unexpected errors
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            errors: [err.message],
            data: null
        });
    }
});


app.listen(PORT, () => {
  // Connect to Database
  connectDB();
  console.log(`✅ Server running at http://localhost:${PORT}`);
});