const express = require('express')  // We import the express application
const cors = require('cors') // Necessary for localhost
const { middleware } = require('./utils/middleware');
const morgan = require('morgan');
const app = express() // Creates an express application in app
const expressRouter = require('./express-router/route');
const dataStorage = require('./storage/currencies');

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

//middleware (unknownEndpoint)
app.use ((request, response) => {
  response.status(404).json({error: 'unknown endpoint'})
});



const PORT = 2005
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})