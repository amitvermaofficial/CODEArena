import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import session from 'express-session';

// Import the main router which contains all other routes
import mainRouter from './routes/routes.js';
import { ApiError } from './utils/ApiError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:5000',
    credentials: true
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// --- Session Setup ---
// Required for managing user login state (local or OAuth)
app.use(session({
    secret: process.env.SESSION_SECRET || 'a-very-strong-secret-key-for-dev', // Use an environment variable for this!
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production' } // Use secure cookies in production
}));

// --- Content Security Policy (CSP) Middleware ---
// This sets a security policy to prevent common attacks.
// The default 404 handler in Express sets a very strict policy ('default-src 'none'')
// which blocks everything, including your favicon and inline styles/scripts.
// We are setting our own policy here to allow what we need for development.
app.use((req, res, next) => {
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; " + // Only allow resources from our own domain by default
        "script-src 'self' 'unsafe-inline'; " + // Allow scripts from our domain and inline scripts
        "style-src 'self' 'unsafe-inline'; " + // Allow styles from our domain and inline styles
        "img-src 'self' data:;" // Allow images from our domain and data URIs
    );
    next();
});

// View engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'views'));

// --- API Routes ---
// Mount the main API router. All API calls will be prefixed with /api/v1
app.use("/api/v1", mainRouter);

// --- Page Rendering Routes ---
// These routes render the .pug files for the user to see in the browser.

// Handle favicon requests to prevent 404 errors and the strict default CSP
app.get('/favicon.ico', (req, res) => res.status(204).send());

// Home/Feed page
app.get("/", (req, res) => {
    res.render("feed", { title: "Feed" });
});

// Login page
app.get("/login", (req, res) => {
    res.render("login", { title: "Login" });
});

// Register page
app.get("/register", (req, res) => {
    res.render("register", { title: "Register" });
});

// Problems page
app.get("/problems", (req, res) => {
    res.render("problems", { title: "Problems" });
});

// Contests page
app.get("/contests", (req, res) => {
    res.render("contests", { title: "Contests" });
});

// User Profile page (example)
app.get("/profile/:username", (req, res) => {
    res.render("profile", { title: "Profile", user: { username: req.params.username, fullName: "A Coder", problemsSolved: 10 } });
});

// Global error handler
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ ...err, message: err.message, success: false });
    }
    console.error(err);
    return res.status(500).json({ message: "Internal Server Error", success: false });
});

export { app };