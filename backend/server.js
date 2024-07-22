const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const dataRoutes = require("./routes/dataRoutes")
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI,{serverSelectionTimeoutMS: 50000})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));


// Routes
app.use('/api/data', dataRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
