const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const Usuarios2Schema = mongoose.Schema(
  {
    Nombre: {
      type: String,
    },
    Apellido: {
      type: String,
    },
    Email: Number,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

Usuarios2Schema.plugin(mongoosePaginate)
Usuarios2Schema.index({
  Nombre: 'text',
  Apellido: 'text',
  Email: 'text',
})

const myModel = (module.exports = mongoose.model('Usuarios2', Usuarios2Schema, 'usuarios2'))
myModel.schema = Usuarios2Schema
