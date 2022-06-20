const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const Tablas2Schema = mongoose.Schema(
  {
    Nombre: {
      type: String,
    },
    Descripcion: String,
    imagen: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

Tablas2Schema.plugin(mongoosePaginate)
Tablas2Schema.index({
  Nombre: 'text',
  Descripcion: 'text',
  imagen: 'text',
})

const myModel = (module.exports = mongoose.model('Tablas2', Tablas2Schema, 'tablas2'))
myModel.schema = Tablas2Schema
