const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const router = require('./routes/index.routes');
const PORT = 3003 || process.env.PORT;
require('./database/database')
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(PORT, () => {
    console.log(`Beneficiary sur le port : http://localhost:${PORT} `);

})
