import { Webview } from "@tauri-apps/api/webview";
import { PhysicalSize, Window } from "@tauri-apps/api/window"
import { errorController } from "./errorLib";

let projecting: boolean = false;
let error: boolean = false;
let proyectorWindow: any = null;
const codeWindow = 'projector';
const projectorWindowPath = './../projector.html';
let projectorWebview: Webview;

/**
 * Controla apertura y cierra del proyector
 * @returns {Promise<Boolean>}
 */
export const projectorController = async (): Promise<Boolean> => {

    if (proyectorWindow && projecting) {
        proyectorWindow.setFocus();
        return true;
    }

    proyectorWindow = new Window(codeWindow);

    await proyectorWindow.once("tauri://created", async () => {
        projectorWebview = new Webview(proyectorWindow, codeWindow, {
            url: projectorWindowPath,
            x: 0,
            y: 0,
            width: 800,
            height: 600
        });

        await projectorWebview.once('tauri://created', async () => {
            projecting = true;
        });

        await projectorWebview.once('tauri://error', async (e: any) => {
            projecting = false;
            error = true;
            errorController("Error al abrir el proyector", e.payload, true, false);
        });

        await projectorWebview.window.setMaximizable(true);
        await projectorWebview.window.setResizable(true);

        await projectorWebview.window.onResized(async ({ payload: size }) => {
            await projectorWebview.setSize(new PhysicalSize(size.width, size.height));
        });
    });

    await proyectorWindow.once("tauri://error", async (e: any) => {
        projecting = false;
        error = true;
        errorController("Error al abrir el proyector", e.payload, true, false);
    });

    await proyectorWindow.once("tauri://destroyed", async () => {
        proyectorWindow = null;
        projecting = false;
    });

    return !error;
};