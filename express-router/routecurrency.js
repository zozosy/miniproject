const express = require('express');
const router = express.Router();
const currency = require('../models/Currency');
/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
//router.get('/', (request, response) => {
  //  response.send('Hello HabibA!')
 // })
  
  /**
   * TODO: GET Endpoint
   * @receives a get request to the URL: http://localhost:3001/api/currency/
   * @responds with returning the data as a JSON
   */
  router.get('/api/currency/', async (request, response) => {
    try {
      const currencies = await currency.findAll();
      response.json (currencies)
    } catch (error) {
      response.status(500).json({ error: error.message });
  }
  })
  
  /**
   * TODO: GET:id Endpoint
   * @receives a get request to the URL: http://localhost:3001/api/currency/:id
   * @responds with returning specific data as a JSON
   */3
  router.get('/api/currency/:id', async (request, response) => {
    const moneyId = Number(request.params.id);
    const currencyIndex = await currency.findByPk((c) => c.id === moneyId);
  
    if (currencyIndex === -1) {
      return response.status(404).json({ error: 'resource not found' });
    }
  
   // const foundCurrency = { ...currencies[currencyIndex] };
    response.json(currencyIndex);
  });
  
  /**
   * TODO: POST Endpoint
   * @receives a post request to the URL: http://localhost:3001/api/currency,
   * with data object enclosed
   * @responds by returning the newly created resource
   */
  router.post('/api/currency', async (request, response) => {
    try {
    const   { currencyCode, countryId, conversionRate } = request.body;
    if (!currencyCode || !countryId || !conversionRate) {
      return response.status(400).json({ error: 'content missing' });
    }
    const addCurrency = await currency.create({
      currencyCode,       
      countryId, 
      conversionRate});
      response.status(201).json(addCurrency); 
      console.log('New Currency Created:', addCurrency);
  }
    catch(error){
      return response.status(201).json(error);
    }
  });
  
  
  
  /**
   * TODO: PUT:id endpoint
   * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
   * with data object enclosed
   * Hint: updates the currency with the new conversion rate
   * @responds by returning the newly updated resource
   */

  // Change everyone without a last name to "Doe"
//await User.update({ lastName: "Doe" }, {
 // where: {
  //  lastName: null
  //}
//});
  
  router.put('/api/currency/:id/:newRate', async (request, response) => {
    const putMoney = parseInt(request.params.id);
    const moneyRate = parseFloat(request.params.newRate);
    const ratee = await currency.update({conversionRate : moneyRate}, {
      where:
      {putMoney}
    }
      )
  
    if (!ratee){ 
   return response.status(404).json({error : 'resource not found'})
    }
    ratee.conversionRate = moneyRate;
    response.json(ratee); 
  })
  /**
   * //// Delete everyone named "Jane"
await User.destroy({
  where: {
    firstName: "Jane"
  }
});
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
router.delete('/api/currency/:id', async (request, response) => {
    const id  = parseInt (request.params.id);
    currencies = await currency.destroy({
      where: {id}
    })
    response.sendStatus(204); 
   
   })

   module.exports = router;