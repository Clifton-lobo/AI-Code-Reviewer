const express = require('express');
const cors = require('cors');

const app = express();
const aiRoutes = require('./routes/ai.routes');

// Apply middleware first
app.use(express.json());  // Enables JSON body parsing
app.use(cors());  // Enables CORS for cross-origin requests

// Define routes
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/ai', aiRoutes);

module.exports = app;
