module.exports = (app) => {
  const tablas2 = require('../controllers/tablas2.controller.js')

  // Get all records
  app.get('/api/tablas2', (req, res) => {
    tablas2.findAll({ req, res })
  })

  // Search records
  app.get('/api/tablas2/search', (req, res) => {
    tablas2.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/tablas2/:ID', (req, res) => {
    tablas2.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/tablas2', (req, res) => {
    tablas2
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/tablas2/:ID', (req, res) => {
    tablas2
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/tablas2/:ID', (req, res) => {
    tablas2
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
