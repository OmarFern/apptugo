const Turnos = require('../models/turnos.model.js')
const fs = require('fs')
const paginate = require('../paginate')
const errors = require('../services/errors.service')

// Create and Save a new Turno
exports.create = async (options) => {
  const data = options.req ? options.req.body : options.data
  const updatedData = {}

  if (typeof data.Nombre !== 'undefined') updatedData['Nombre'] = data.Nombre

  if (typeof data.Fecha !== 'undefined') updatedData['Fecha'] = data.Fecha

  if (data.Servicio === 'null') data.Servicio = null
  updatedData['Servicio'] = {}
  try {
    const Servicios = require('../models/servicios.model.js')
    let ReceivedServicio = typeof data.Servicio === 'string' ? JSON.parse(data.Servicio) : data.Servicio
    Servicioinfo = Array.isArray(ReceivedServicio) ? ReceivedServicio[0] : ReceivedServicio

    if (!Servicioinfo._id) {
      const ServicioID = require('mongoose').Types.ObjectId()
      const Servicio = new Servicios({ ...Servicioinfo, _id: ServicioID })
      Servicio.save()
      updatedData['Servicio'] = ServicioID
    } else {
      updatedData['Servicio'] = Servicioinfo._id
    }
  } catch (e) {
    updatedData['Servicio'] = data.Servicio
  }

  // Create a Turno
  const Turno = new Turnos(updatedData)

  // Save Turno in the database
  Turno.save()
    .then((data) => {
      exports.findOne({ ID: data._id, res: options.res })
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while saving the record.',
      })
    })
}

exports.createAsPromise = (options) => {
  return new Promise(async (resolve, reject) => {
    const data = options.req ? options.req.body : options.data
    const updatedData = {}
    if (data._id) updatedData._id = data._id

    if (typeof data.Nombre !== 'undefined') updatedData['Nombre'] = data.Nombre

    if (typeof data.Fecha !== 'undefined') updatedData['Fecha'] = data.Fecha

    if (data.Servicio === 'null') data.Servicio = null
    updatedData['Servicio'] = {}
    try {
      const Servicios = require('../models/servicios.model.js')
      let ReceivedServicio = typeof data.Servicio === 'string' ? JSON.parse(data.Servicio) : data.Servicio
      Servicioinfo = Array.isArray(ReceivedServicio) ? ReceivedServicio[0] : ReceivedServicio

      if (!Servicioinfo._id) {
        const ServicioID = require('mongoose').Types.ObjectId()
        const Servicio = new Servicios({ ...Servicioinfo, _id: ServicioID })
        Servicio.save()
        updatedData['Servicio'] = ServicioID
      } else {
        updatedData['Servicio'] = Servicioinfo._id
      }
    } catch (e) {
      updatedData['Servicio'] = data.Servicio
    }

    // Create a Turno
    const Turno = new Turnos(updatedData)

    // Save Turno in the database
    Turno.save()
      .then((result) => {
        if (options.skipfind) {
          resolve(result)
        } else {
          exports.findOne({ ID: result._id, res: options.res }).then((result) => {
            resolve(result)
          })
        }
      })
      .catch((err) => {
        reject(errors.prepareError(err))
      })
  })
}

// Retrieve and return all Turnos from the database.
exports.findAll = (options) => {
  const query = options.query ? options.query : options.req.query
  if (typeof query.populate === 'undefined') query.populate = 'true'
  const data = options.req ? options.req.body : options.data
  if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)

  const findString = {}
  if (query.fixedSearch) {
    query.fixedSearch = JSON.parse(query.fixedSearch)
    findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
  }

  Turnos.find(findString)
    .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

    .populate(
      (query.populate === 'true' || query.populate?.indexOf('Servicios') > -1) && {
        strictPopulate: false,
        model: 'Servicios',
        path: 'Servicio',
      }
    )
    .then((turnos) => {
      options.res.json(paginate.paginate(turnos, { page: query.page, limit: query.limit || 10 }))
    })
    .catch((err) => {
      options.res.status(500).send({
        message: err.message || 'Some error occurred while retrieving records.',
      })
    })
}

exports.find = (options) => {
  return new Promise((resolve, reject) => {
    const query = options.query ? options.query : options.req.query
    const data = options.req ? options.req.body : options.data
    let findString = query.searchString ? { $text: { $search: query.searchString } } : {}
    if (query.searchField) {
      if (Turnos.schema.path(query.searchField).instance === 'Boolean') {
        findString = { [query.searchField]: JSON.parse(query.searchString) }
      } else if (Turnos.schema.path(query.searchField).instance === 'Date') {
        findString = { $expr: { $eq: [query.searchString, { $dateToString: { date: `$${query.searchField}`, format: '%Y-%m-%d' } }] } }
      } else {
        findString = { [query.searchField]: { $regex: new RegExp(query.searchString, 'i') } }
      }

      if (Turnos.schema.path(query.searchField).instance === 'ObjectID' || Turnos.schema.path(query.searchField).instance === 'Array') {
        findString = { [query.searchField]: require('mongoose').Types.ObjectId(query.searchString) }
      }
    } else if (query.filters) {
      query.filters.forEach((filter) => {
        const parsed = typeof filter === 'string' ? JSON.parse(filter) : filter
        findString[parsed.field] = parsed.value
      })
    }
    if (typeof query.sort === 'string') query.sort = JSON.parse(query.sort)

    if (query.fixedSearch) {
      query.fixedSearch = JSON.parse(query.fixedSearch)
      findString[query.fixedSearch.field] = { $regex: new RegExp(query.fixedSearch.value, 'i') }
    }

    Turnos.find(findString)
      .sort(query.sort && { [query.sort.field]: query.sort.method === 'desc' ? -1 : 1 })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Servicios') > -1) && {
          strictPopulate: false,
          model: 'Servicios',
          path: 'Servicio',
        }
      )
      .then((turno) => {
        resolve(paginate.paginate(turno, { page: query.page, limit: query.limit || 10 }))
      })
      .catch((err) => {
        options.res.status(500).send({
          message: err.message || 'Some error occurred while retrieving records.',
        })
      })
  })
}

// Find a single Turno with a ID
exports.findOne = (options) => {
  return new Promise((resolve, reject) => {
    const query = { populate: 'true' }
    const id = options.req ? options.req.params.ID : options.ID
    Turnos.findById(id)

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Servicios') > -1) && {
          strictPopulate: false,
          model: 'Servicios',
          path: 'Servicio',
        }
      )
      .then((turno) => {
        if (!turno) {
          return options.res.status(404).send({
            message: 'Turno not found with id ' + id,
          })
        }
        resolve(paginate.paginate([turno]))
      })
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          return options.res.status(404).send({
            message: 'Turno not found with id ' + id,
          })
        }
        return options.res.status(500).send({
          message: 'Error retrieving Turno with id ' + id,
        })
      })
  })
}

// Update a turno identified by the ID in the request
exports.update = (options) => {
  return new Promise(async (resolve, reject) => {
    const id = options.req ? options.req.params.ID : options.ID
    const data = options.req ? options.req.body : options.data
    const updatedData = {}

    if (typeof data.Nombre !== 'undefined') updatedData['Nombre'] = data.Nombre

    if (typeof data.Fecha !== 'undefined') updatedData['Fecha'] = data.Fecha

    if (data.Servicio === 'null') data.Servicio = null
    updatedData['Servicio'] = {}
    try {
      const Servicios = require('../models/servicios.model.js')
      let ReceivedServicio = typeof data.Servicio === 'string' ? JSON.parse(data.Servicio) : data.Servicio
      Servicioinfo = Array.isArray(ReceivedServicio) ? ReceivedServicio[0] : ReceivedServicio

      if (!Servicioinfo._id) {
        const ServicioID = require('mongoose').Types.ObjectId()
        const Servicio = new Servicios({ ...Servicioinfo, _id: ServicioID })
        Servicio.save()
        updatedData['Servicio'] = ServicioID
      } else {
        updatedData['Servicio'] = Servicioinfo._id
      }
    } catch (e) {
      updatedData['Servicio'] = data.Servicio
    }

    // Find Turno and update it with the request body
    const query = { populate: 'true' }
    Turnos.findByIdAndUpdate(id, updatedData, { new: true })

      .populate(
        (query.populate === 'true' || query.populate?.indexOf('Servicios') > -1) && {
          strictPopulate: false,
          model: 'Servicios',
          path: 'Servicio',
        }
      )
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

// Delete a turno with the specified ID in the request
exports.delete = (options) => {
  return new Promise((resolve, reject) => {
    const params = options.req ? options.req.params : options
    let theFilter = { _id: params.ID }

    if (options.queryString && options.queryField) {
      theFilter = { [options.queryField]: options.queryString }
    }
    Turnos.deleteMany(theFilter)
      .then((result) => {
        resolve(result)
      })
      .catch((e) => {
        reject(e)
      })
  })
}
