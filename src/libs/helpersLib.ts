import { errorController } from "./errorLib";

/**
 * Convierte un objeto a Uint8Array
 * @param {object} content Contenido a convertir
 * @returns {Uint8Array | null}
 */
export const convertObjectToUint8Array = (content: object): Uint8Array | null => {
    try {
        if (!content) throw new Error('Contenido a convertir vacío o nulo.');

        const json = JSON.stringify(content, null, 2);
        return new TextEncoder().encode(json);
    } catch (error) {
        errorController('No se logró convetir el objeto a Uint8Array.', error, true, false);
        return null;
    }
}