


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('../routes/userRoutes');
const applyRoutes = require('../routes/applyRoutes');
const app = express();
require('dotenv').config();

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
const cors = require('cors');

app.use(cors());



// Routes
app.get('/', (req, res) => {
  res.send('Hello');
});


app.use('/api', userRoutes);
app.use('/apply', applyRoutes);
// Start server
app.listen(3000, () => console.log("Server running on port 3000"));