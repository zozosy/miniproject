const express = require('express');
const router = express.Router();
const { currencies } = require('../storage/currencies');
/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
router.get('/', (request, response) => {
    response.send('Hello HabibA!')
  })
  
  /**
   * TODO: GET Endpoint
   * @receives a get request to the URL: http://localhost:3001/api/currency/
   * @responds with returning the data as a JSON
   */
  router.get('/api/currency/', (request, response) => {
    response.json(currencies)
  })
  
  /**
   * TODO: GET:id Endpoint
   * @receives a get request to the URL: http://localhost:3001/api/currency/:id
   * @responds with returning specific data as a JSON
   */
  router.get('/api/currency/:id', (request, response) => {
    const moneyId = Number(request.params.id);
    const currencyIndex = currencies.findIndex((c) => c.id === moneyId);
  
    if (currencyIndex === -1) {
      return response.status(404).json({ error: 'resource not found' });
    }
  
    const foundCurrency = { ...currencies[currencyIndex] };
    response.json(foundCurrency);
  });
  
  /**
   * TODO: POST Endpoint
   * @receives a post request to the URL: http://localhost:3001/api/currency,
   * with data object enclosed
   * @responds by returning the newly created resource
   */
  router.post('/api/currency', (request, response) => {
    const { currencyCode, country, conversionRate} = request.body;
    if (!currencyCode || !country  || !conversionRate) {
     return response.status(400).json( {error : 'content missing'} )
    }
    const add = {currencyCode, country, conversionRate}
     currencies.push(add);  
     console.log('added money: ', add );
     response.status(201).json(add); 
  });
  
  
  
  /**
   * TODO: PUT:id endpoint
   * @receives a put request to the URL: http://localhost:3001/api/currency/:id/:newRate
   * with data object enclosed
   * Hint: updates the currency with the new conversion rate
   * @responds by returning the newly updated resource
   */
  
  router.put('/api/currency/:id/:newRate', (request, response) => {
    const putMoney = parseInt(request.params.id);
    const moneyRate = parseFloat(request.params.newRate);
    const ratee = currencies.find((call) => call.id === putMoney);
    if (!ratee){ 
   return response.status(404).json({error : 'resource not found'})
    }
    ratee.conversionRate = moneyRate;
    response.json(ratee); 
  })
  /**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
router.delete('/api/currency/:id', (request, response) => {
    const remove = parseInt (request.params.id);
    currencies = currencies.filter((call) => call.id !== remove)
    response.sendStatus(204); 
   
   })

   module.exports = router;