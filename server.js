const express = require('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
const { middleware } = require('./utils/middleware');
const morgan = require('morgan');
const app = express() // Creates an express application in app

middleware(app);
app.use(morgan ('dev'))
/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json())


/**
 * DATA STORAGE
 * We're using a local variable 'currencies' to store our data: a list of currency objects
 * Each object represents a 'currency', and contains the following fields
 * id: a number, 
 * currencyCode: a string, three letters (see https://www.iban.com/currency-codes as reference)
 * country: a string, the name of the country
 * conversionRate: the amount, in that currency, required to equal 1 Canadian dollar
 */
let currencies = [
  {
    id: 1,
    currencyCode: "CDN",
    country: "Canada",
    conversionRate: 1
  },
  {
    id: 2,
    currencyCode: "USD",
    country: "United States of America",
    conversionRate: 0.75
  }
]

/**
 * TESTING Endpoint (Completed)
 * @receives a get request to the URL: http://localhost:3001/
 * @responds with the string 'Hello World!'
 */
app.get('/', (request, response) => {
  response.send('Hello HabibA!')
})

/**
 * TODO: GET Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/
 * @responds with returning the data as a JSON
 */
app.get('/api/currency/', (request, response) => {
  response.json(currencies)
})

/**
 * TODO: GET:id Endpoint
 * @receives a get request to the URL: http://localhost:3001/api/currency/:id
 * @responds with returning specific data as a JSON
 */
app.get('/api/currency/:id', (request, response) => {
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
app.post('/api/currency', (request, response) => {
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

app.put('/api/currency/:id/:newRate', (request, response) => {
  const putMoney = parseInt(request.params.id);
  const moneyRate = parseFloat(request.params.newRate);
  const ratee = currencies.find((call) => call.id === putMoney);
  if (!ratee){ 
 return response.status(404).json({error : 'resource not found'})
  }
  ratee.conversionRate = moneyRate;
  response.json(ratee); 
})

//middleware (unknownEndpoint)
app.use ((request, response) => {
  response.status(404).json({error: 'unknown endpoint'})
});

/**
 * TODO: DELETE:id Endpoint
 * @receives a delete request to the URL: http://localhost:3001/api/currency/:id,
 * @responds by returning a status code of 204
 */
app.delete('/api/currency/:id', (request, response) => {
  const remove = parseInt (request.params.id);
  currencies = currencies.filter((call) => call.id !== remove)
  response.sendStatus(204); 
 
 })

const PORT = 2005
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})