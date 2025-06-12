const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('../routes/userRoutes');
const applyRoutes = require('../routes/applyRoutes');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// DB Connection
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB error:", err));
}

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Vercel + Express!');
});

app.use('/api', userRoutes);
app.use('/apply', applyRoutes);

// ❌ DO NOT include `app.listen(...)`
// ✅ Instead, export the app for Vercel to use as a serverless function
module.exports = app;
