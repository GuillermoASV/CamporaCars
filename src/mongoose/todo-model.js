import mongoose from 'mongoose';
import MongooseSmartDelete from 'mongoose-smart-delete';
const todoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  importancia: {
    type: String,
    required: true,
  },
  fecha: {
    type: String,
    required: true,
  },
  limiteFecha: {
    type: String,
    required: true,
  },
  titulo: {
    type: String,
    required: true,
  },
  completado: {
    type: Boolean,
    required: false,
    default: false,
  },
  materiales: {
    type: [String],
    required: false,
    default: [],
  },
  cantidades: {
    type: [Number],
    required: false,
    default: [],
  },
  gastos: {
    type: [Number],
    required: false,
    default: [],
  },
  historialInventario: {
    type: [String],
    required: false,
    default: [],
  },
  presupuesto: { type: Number, required: false, default: 0 },
  createdAt: { type: Date, default: Date.now },
});
todoSchema.plugin(MongooseSmartDelete);

const historialSchema = new mongoose.Schema(
  {
    accion: {
      type: String,
      required: true,
    },
    titulo: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    importancia: {
      type: String,
      required: true,
    },
    fecha: {
      type: String,
      required: true,
    },
    limiteFecha: {
      type: String,
      required: true,
    },
  },
  { capped: { size: 5242880, max: 50 } },
);

const materialSchema = new mongoose.Schema({
  materialYCosto: {
    type: [String, Number, Number],
    required: false,
    default: [],
  },

  createdAt: { type: Date, default: Date.now },
});

export const Historial = mongoose.models.Historial || mongoose.model('Historial', historialSchema);
export const Material = mongoose.models.Material || mongoose.model('Material', materialSchema);
export const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema); // lo que hace .models.Todo es que si ya existe el modelo lo reutiliza, si no es usa mongoose.model('Todo', todoSchema) y lo crea
