module.exports = (app) => {
  const usuarios2 = require('../controllers/usuarios2.controller.js')

  // Get all records
  app.get('/api/usuarios2', (req, res) => {
    usuarios2.findAll({ req, res })
  })

  // Search records
  app.get('/api/usuarios2/search', (req, res) => {
    usuarios2.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/usuarios2/:ID', (req, res) => {
    usuarios2.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/usuarios2', (req, res) => {
    usuarios2
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/usuarios2/:ID', (req, res) => {
    usuarios2
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/usuarios2/:ID', (req, res) => {
    usuarios2
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
