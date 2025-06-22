import { emit, listen } from '@tauri-apps/api/event';
import { errorController } from './errorLib';

// Define los comandos aceptados
export type EventoPayload =
  | { type: 'html'; content: string }
  | { type: 'clase'; selector: string; clase: string; accion: 'agregar' | 'quitar' | 'toggle' }
  | { type: 'scroll'; selector: string; comportamiento?: ScrollBehavior; top?: number; left?: number };

// Nombre único del canal
const EVENT_PROJECT = import.meta.env.VITE_PROJECTOR_ID_WINDOW;

/**
 * Emitir mensaje al proyector
 * @param {EventoPayload} payload Mensaje a enviar
 * @returns {Promise<Boolean>}
 */
export async function sendEventToProject(payload: EventoPayload): Promise<Boolean> {
    try {
        await emit(EVENT_PROJECT, payload);

        return true;
    } catch (error) {
        errorController("Error al enviar mensaje al proyector.", error, true, false);
        return false;
    }
}

/**
 * Escuchar eventos en el proyector
 * @param {void} callback Función que se ejecutará cuando reciba un mensaje
 */
export function listenerEventController(callback: (payload: any) => void) {
  try {
    listen(EVENT_PROJECT, ({ payload }) => {
        if (!payload || typeof payload !== 'object') return;
        callback(payload);
    });
  } catch (error) {
    errorController("Error al recibir mensaje en el proyector.", error, true, false);
  }
}