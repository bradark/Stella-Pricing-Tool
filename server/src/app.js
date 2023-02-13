const express = require('express');
const cors = require('cors');

const pricessRouter = require('./../routes/prices.route.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/prices', pricessRouter);

module.exports = app;