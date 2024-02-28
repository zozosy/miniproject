const express = require('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
require('dotenv').config();
const { middleware } = require('./utils/middleware');
const morgan = require('morgan');
const app = express() // Creates an express application in app
const dataStorage = require('./storage/currencies')
const expressRouter = require('./express-router/routecurrency');
const countries = require('./express-router/countryrouter')
const countrycurrency = require('./express-router/countrycurrency');
const sequelize = require('./config/sequelize');


middleware(app);

app.use(morgan ('dev'))

/**
 * Initial application setup
 * We need to use cors so we can connect to a localhost later
 * We need express.json so we can receive requests with JSON data attached
 */
app.use(cors())
app.use(express.json())

app.use((request, response, next) => {
  request.data = dataStorage; 
  next();
});

app.use('/', expressRouter);
app.use('/', countries)
app.use('/', countrycurrency)
//middleware (unknownEndpoint)
app.use ((request, response) => {
  response.status(404).json({error: 'unknown endpoint'})
});

//await sequelize.sync({ force: true });
//console.log("All models were synchronized successfully.");

const PORT = 2005;
sequelize.sync().then(() => {
  console.log("connected to PG")
  app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`)
  })
})
.catch((error) => {
  console.error("syncing database error", error);
})
