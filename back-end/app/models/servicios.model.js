const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const ServiciosSchema = mongoose.Schema(
  {
    Nombre: {
      type: String,
    },
    Duracion: {
      type: String,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
)

ServiciosSchema.virtual('Turnos', {
  ref: 'Turnos',
  localField: '_id',
  foreignField: 'Servicio',
  justOne: false,
  type: '',
})

ServiciosSchema.plugin(mongoosePaginate)
ServiciosSchema.index({
  Nombre: 'text',
  Duracion: 'text',
})

const myModel = (module.exports = mongoose.model('Servicios', ServiciosSchema, 'servicios'))
myModel.schema = ServiciosSchema
