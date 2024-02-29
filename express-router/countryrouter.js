const express = require('express');
const router = express.Router();
const country = require('../models/Country');


  
  /**
   * TODO: GET Endpoint
   * @receives a get request to the URL: http://localhost:3001/api/currency/
   * @responds with returning the data as a JSON
   */
  router.get('/api/country/', async (request, response) => {
    const countries = await country.findAll();
    response.json (countries)
  })
  
  
  /**
   * TODO: POST Endpoint
   * @receives a post request to the URL: http://localhost:3001/api/currency,
   * with data object enclosed
   * @responds by returning the newly created resource
   */
  router.post('/api/country', async (request, response) => {
    try {
      const name  = request.body;
      if (!name) {
        return response.status(400).json({ error: 'content missing' });
      }
      const addCurrency = await country.create(
        name );
        return response.json(addCurrency);
    }
      catch(error){
          return response.status(500).json({ error: 'Internal Server Error' })
      }
  });
  
  
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
router.delete('/api/country/:id', async (request, response) => {
    const remove = parseInt (request.params.id);
    countries = await country.destroy({
      where: {id: remove}
    })
    response.sendStatus(204); 
   
   })

   module.exports = router;