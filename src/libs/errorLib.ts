import { setLogController } from "./logLib";

/**
 * Controla el sistema de errores
 * @param {message} message Mensaje descriptivo contextual del error
 * @param {unknown} error Pila o mensaje técnico del error
 * @param {boolean} log Si es verdadero, escribe en el log del sistema
 * @param {boolean} showAlert Si es verdadero, emite una alerta mostrada al usuario
 */
export const errorController = async (message: string, error: unknown = null, log: boolean = true, showAlert: boolean = true) => {
    console.error(message);

    if (showAlert) {
        alert(message);
    }

    if (message && log) {
        setLogController(message, error);
    }
}