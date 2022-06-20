module.exports = (app) => {
  const servicios = require('../controllers/servicios.controller.js')

  // Get all records
  app.get('/api/servicios', (req, res) => {
    servicios.findAll({ req, res })
  })

  // Search records
  app.get('/api/servicios/search', (req, res) => {
    servicios.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/servicios/:ID', (req, res) => {
    servicios.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/servicios', (req, res) => {
    servicios
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/servicios/:ID', (req, res) => {
    servicios
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/servicios/:ID', (req, res) => {
    servicios
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
