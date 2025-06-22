import { BaseDirectory, exists, readTextFile, writeFile } from "@tauri-apps/plugin-fs";
import { errorController } from "./errorLib";

/**
 * Comprueba si un archivo existe
 * @param {string} nameFile Nombre del archivo
 * @param {BaseDirectory} baseDirectoryApp Tipo de directorio local
 * @returns {Promise<Boolean>}
 */
export const checkFileExists = async (nameFile:  string, baseDirectoryApp: BaseDirectory = BaseDirectory.AppLocalData): Promise<Boolean> => {
    try {
        if (!nameFile) throw new Error('Nombre del archivo vacío o nulo.');
        if (!baseDirectoryApp) throw new Error('Directorio base no reconocido o vacío');
        
        return await exists(nameFile, {baseDir: baseDirectoryApp});
    } catch (error) {
        errorController('No se logró encontrar el archivo.', error, true, false);
        return false;
    }
}

/**
 * Obtiene el contenido de un archivo
 * @param {string} nameFile Nombre del archivo
 * @param {BaseDirectory} baseDirectoryApp Tipo de directorio local
 * @returns {Promise<Object>}
 */
export const getFileContent = async (nameFile: string, baseDirectoryApp: BaseDirectory = BaseDirectory.AppLocalData): Promise<Object> => {
    try {
        if (!nameFile) throw new Error('Nombre del archivo vacío o nulo.');
        if (!baseDirectoryApp) throw new Error('Directorio base no reconocido o vacío');

        const content = await readTextFile(nameFile, {baseDir: baseDirectoryApp});
        
        return JSON.parse(content);
    } catch (error) {
        errorController('No se logró leer el archivo.', error, true, false);
        return {};
    }
}

/**
 * Crea un archivo con un determinado contenido si no existe
 * @param {string} nameFile Nombre del archivo
 * @param {Uint8Array} fileContent Contenido del archivo en Uint8Array
 * @param {BaseDirectory} baseDirectoryApp Tipo de directorio local
 * @returns {Promise<Boolean>}
 */
export const createFileIfNotExists = async (nameFile: string, fileContent: Uint8Array, baseDirectoryApp: BaseDirectory = BaseDirectory.AppLocalData): Promise<Boolean> => {
    try {
        if (!nameFile) throw new Error('Nombre del archivo vacío o nulo.');
        if (!fileContent) throw new Error('Contenido a cargar en el archivo vacío o nulo.');
        if (!baseDirectoryApp) throw new Error('Directorio base no reconocido o vacío');

        if (await checkFileExists(nameFile)) {
            return true;
        }

        await writeFile(
            nameFile,
            fileContent, 
            {baseDir: baseDirectoryApp}
        );

        return await checkFileExists(nameFile);
    } catch (error) {
        errorController('No se logró escribir el archivo.', error, true, false);
        return false;
    }
}

/**
 * Agrega contenido a un determinado archivo
 * @param {string} nameFile Nombre del archivo
 * @param {Uint8Array} fileContent Contenido del archivo en Uint8Array
 * @param {BaseDirectory} baseDirectoryApp Tipo de directorio local
 * @returns {Promise<Boolean>}
 */
export const appendFileContent = async (nameFile: string, fileContent: Uint8Array, baseDirectoryApp: BaseDirectory = BaseDirectory.AppLocalData): Promise<Boolean> => {
    try {
        if (!nameFile) throw new Error('Nombre del archivo vacío o nulo.');
        if (!fileContent) throw new Error('Contenido a cargar en el archivo vacío o nulo.');
        if (!baseDirectoryApp) throw new Error('Directorio base no reconocido o vacío');
        
        await writeFile(
            nameFile,
            fileContent, 
            {baseDir: baseDirectoryApp, append: true}
        );
    } catch (error) {
        errorController('No se logró escribir el archivo.', error, true, false);
        return false;
    }

    return await checkFileExists(nameFile);
}