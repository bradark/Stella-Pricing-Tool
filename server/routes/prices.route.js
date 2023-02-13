const express = require('express');

const { getPriceList, } = require('./../controllers/prices.controller.js');

const pricesRouter = express.Router();

pricesRouter.get('/getpricelist/:item', getPriceList);

module.exports = pricesRouter;