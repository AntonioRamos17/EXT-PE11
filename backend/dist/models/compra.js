/**
 * Universidad de La Laguna
 * Asignatura: Sistemas y Tecnologías Web
 * Proyecto Final SyTW
 * Realizada por:
 *  > Antonio Ramos Castilla (alu0101480367@ull.edu.es)
 *  > Ithaisa Morales Arbelo (alu0101482194@ull.edu.es)
 *  > Valerio Luis Cabrera   (alu0101476049@ull.edu.es)
 */
import { model, Schema } from 'mongoose';
import { proveedorModel } from './proveedor.js';
/**
 * Esquema de productos en una venta
 */
const ProductoSchema = new Schema({
    productoId: Schema.Types.ObjectId,
    cantidad: Number,
    precio: Number
});
/**
 * Esquema de la colección de compras
 */
const CompraSchema = new Schema({
    id_: {
        type: Number,
        unique: true,
        required: true,
        validate: (value) => {
            if (value < 0) {
                throw new Error('El id de una compra no puede ser negativo.');
            }
            if (value % 1 !== 0) {
                throw new Error('El id de una compra no puede ser un número decimal.');
            }
        }
    },
    fecha_: {
        type: Date,
        required: true,
        validate: (value) => {
            if (value > new Date()) {
                throw new Error('La fecha de una compra no puede ser futura.');
            }
            if (value === new Date('Invalid Date')) {
                throw new Error('La fecha de una compra no puede ser inválida.');
            }
        }
    },
    proveedor_: {
        type: Schema.Types.ObjectId,
        ref: 'Proveedores',
        required: true,
        validate: {
            validator: async function (value) {
                // Busca la persona en la base de datos
                const persona = await proveedorModel.findById(value);
                // Devuelve true si la persona existe, false si no
                return !!persona;
            },
            message: props => `El proveedor asociado con ID ${props.value} no existe en la base de datos.`
        }
    },
    importe_: {
        type: Number,
        validate: (value) => {
            if (value < 0) {
                throw new Error('El importe de una compra no puede ser negativo.');
            }
        }
    },
    productos_: {
        type: [ProductoSchema],
        required: true,
        validate: (value) => {
            if (value.length === 0) {
                throw new Error('Una compra debe tener al menos un producto.');
            }
            if (value.some(x => x.cantidad < 0)) {
                throw new Error('La cantidad de un producto no puede ser negativa.');
            }
            if (value.some(x => x.precio < 0)) {
                throw new Error('El precio de un producto no puede ser negativo.');
            }
        }
    }
});
/**
 * Exportación del modelo de la colección de Compras
 */
export const compraModel = model('Compras', CompraSchema);