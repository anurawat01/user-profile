const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');
const config = require('./config/config');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
dotenv.config();


const app = express();

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: config.CLIENT_SECRET
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Mongodb - Connected successfully!');
}).catch(() => {
    console.log('Mongodb - Connection Error');
});

app.get('/healthCheck', (req, res) => {
    res.send('Application is UP !!');
});

app.use('/auth', authRoutes);
app.use('/user', profileRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
