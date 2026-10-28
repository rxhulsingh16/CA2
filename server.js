const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));

const bookRoutes = require('./routes/bookRoutes');

app.use('/api/books', bookRoutes);

app.listen(3000, () => {
    console.log("Server is running :)");
});