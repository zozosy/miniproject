const express = require('express');
const router = express.Router();
const currency = require('../models/Currency');
const countrycurrency = require ('../models/Country');
const Country = require('../models/Country');

  router.get('/api/countrycurrency/', async (request, response) => {
    try {
      const countrycurrency = await currency.findAll({ include:[{model:Country, attributes:["name"]}], attributes:["currencyCode"]});
      response.json (countrycurrency)
    } catch (error) {
      response.status(500).json({ error: error.message });
  }
  })
  module.exports = router 

