const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const TurnosSchema = mongoose.Schema(
  {
    Nombre: {
      type: String,
    },
    Fecha: Date,

    Servicio: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Servicios',
      autopopulate: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

TurnosSchema.plugin(mongoosePaginate)
TurnosSchema.index({
  Nombre: 'text',
  Fecha: 'text',
  Servicio: 'text',
})

const myModel = (module.exports = mongoose.model('Turnos', TurnosSchema, 'turnos'))
myModel.schema = TurnosSchema
