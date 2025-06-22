import { appendFileContent } from "./fileLib";

const LOG_NAME = import.meta.env.VITE_LOG_NAME || 'error.log';

/**
 * Escribe el log del sistema
 * @param {string} context Contexto o descripción del error a escribir
 * @param {unknown} error Error a escribir
 * @param context 
 */
export const setLogController = async (context: string, error: unknown = ''): Promise<void> => {
    const timestamp = new Date().toISOString();

    const messageFormated = error 
        ? `[${timestamp}] ${context}\n${getFormatError(error)}\n`
        : `[${timestamp}] ${context}\n`;

    try {
        await appendFileContent(LOG_NAME, new TextEncoder().encode(messageFormated));
    } catch (logError) {
        console.error("No se pudo escribir en el archivo de log: ", logError);
    }
}

/**
 * Retorna un determinado error en formato string
 * @param {unknown} error Detalle del error
 * @returns string
 */
const getFormatError = (error: unknown): string => {
    if (error instanceof Error) {
        return `${error.name}: ${error.message}\n${error.stack}`;
    } else if (typeof error === 'string') {
        return error;
    }

    return error ? JSON.stringify(error) : '';
}