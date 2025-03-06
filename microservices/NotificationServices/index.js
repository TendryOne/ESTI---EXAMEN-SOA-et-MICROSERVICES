const express = require('express');
const app = express();
const path = require('path')
require('dotenv').config();
const morgan = require('morgan');
const router = require('./routes/index.routes');
const PORT = 3004 || process.env.PORT;
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
require('./database/database')
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
    console.log(`NotificationServices sur le port : http://localhost:${PORT} `);

})
