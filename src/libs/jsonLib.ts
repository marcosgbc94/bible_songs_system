import { createFileIfNotExists, getFileContent } from './fileLib';
import { convertObjectToUint8Array } from './helpersLib';
import { fileJsonTemplate } from '../config/fileJsonTemplate';
import { errorController } from './errorLib';

const JSON_SONGS_NAME = import.meta.env.VITE_JSON_SONGS_NAME || 'songs.json';
const JSON_BIBLE_NAME = import.meta.env.VITE_JSON_BIBLE_NAME || 'bible.json';

/**
 * Obtiene el contenido de un JSON específico
 * @param {string} dataSourceCode Código de fuente de datos
 * @returns {Promise<String | Boolean>}
 */
export const getJsonDataController = async (dataSourceCode: string, fileContentJsonTemplate: Object = fileJsonTemplate): Promise<Object | Boolean> => {
    try {
        if (!dataSourceCode) throw new Error('Código de datos vacío o nulo.');
        if (!fileContentJsonTemplate) throw new Error('Plantilla de contenido JSON vacío o nulo.');

        let nameFile = '';

        switch (dataSourceCode) {
            case "bible": 
                nameFile = JSON_BIBLE_NAME;
                break;
            case "songs": 
                nameFile = JSON_SONGS_NAME;
                break;
        }

        if (!nameFile) throw new Error('Código de datos no encontrado.');

        const fileContent = convertObjectToUint8Array(fileContentJsonTemplate);

        if (!fileContent) {
            throw new Error('Error al converit objeto a Uint8Array.');
        }

        if (await createFileIfNotExists(nameFile, fileContent)) {
            return await getFileContent(nameFile);
        }

        return false;
    } catch (error) {
        errorController('Error al obtener los datos.', error, true, false);
        return false;
    }
}
