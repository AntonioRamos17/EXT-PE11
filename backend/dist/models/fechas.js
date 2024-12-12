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
/**
 * Esquema de una fecha
 */
const FechaSchema = new Schema({
    fecha_: {
        type: Date,
        required: true
    },
    descripcion_: {
        type: String,
        required: true
    }
});
/**
 * Exportación del modelo de la fecha
 */
export const fechaModel = model('Fechas', FechaSchema);
