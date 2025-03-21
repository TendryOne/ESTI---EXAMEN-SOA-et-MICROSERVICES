const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const router = require('./routes/index.routes');
const PORT = 3001 || process.env.PORT;
const cookieParser = require('cookie-parser')
app.use(cookieParser());
require('./database/database')
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
    console.log(`AuthServices sur le port : http://localhost:${PORT} `);

})
