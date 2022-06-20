module.exports = (app) => {
  const turnos = require('../controllers/turnos.controller.js')

  // Get all records
  app.get('/api/turnos', (req, res) => {
    turnos.findAll({ req, res })
  })

  // Search records
  app.get('/api/turnos/search', (req, res) => {
    turnos.find({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Retrieve a single record
  app.get('/api/turnos/:ID', (req, res) => {
    turnos.findOne({ req, res }).then((result) => {
      res.send(result)
    })
  })

  // Add a record
  app.post('/api/turnos', (req, res) => {
    turnos
      .createAsPromise({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(e.code || 500).send(e)
      })
  })

  // Update a record
  app.put('/api/turnos/:ID', (req, res) => {
    turnos
      .update({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })

  // Delete a record
  app.delete('/api/turnos/:ID', (req, res) => {
    turnos
      .delete({ req, res })
      .then((result) => {
        res.send(result)
      })
      .catch((e) => {
        res.status(500).send(e)
      })
  })
}
