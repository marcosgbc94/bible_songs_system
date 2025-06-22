import { getJsonDataController } from './libs/jsonLib';
import { errorController } from "./libs/errorLib";
import { SpeechRecognitionController } from "./libs/speechRecognitionLib";
import { projectorController } from "./libs/projectorLib";
import { sendEventToProject } from './libs/eventBusLib';

let bibleData;
let songsData;

window.addEventListener("DOMContentLoaded", async () => {
    bibleData = await getJsonDataController('bible');
    songsData = await getJsonDataController('songs');

    if (!bibleData) {
        errorController('Error al obtener los datos de la Santa Biblia');
    }

    if (!songsData) {
        errorController('Error al obtener los datos del Himnario');
    }
});

document.getElementById("btn-voz")?.addEventListener("click", async () => {
  const h = await SpeechRecognitionController();
  console.log(h);

  // if (!recognition && SpeechRecognition) {
  //   recognition = new SpeechRecognition;
  //   recognition.lang = "es-CL";

  //   recognition.onresult = (event: any) => {
  //     const texto = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
  //     console.log("Reconocido:", texto);
  //   };

  //   recognition.onstart = () => console.log('[🎤] Reconocimiento iniciado');
  // recognition.onaudiostart = () => console.log('[🎧] Audio recibido');
  // recognition.onsoundstart = () => console.log('[🔊] Sonido detectado');
  // recognition.onspeechstart = () => console.log('[🗣️] Habla detectada');
  // recognition.onsoundend = () => console.log('[🔇] Sonido terminado');
  // recognition.onaudioend = () => console.log('[📴] Audio finalizado');

  // recognition.onspeechend = () => {
  //   console.log('[🛑] Se dejó de hablar, deteniendo reconocimiento');
  //   recognition.stop(); // 👈 Aquí se detiene automáticamente
  //   recognition = null;
  // };

  //   recognition.start();
  // }
});

document.getElementById("btn-abrir")?.addEventListener("click", async () => {

  const h =await projectorController();
  console.log(h)
});

document.getElementById("btn-enviar")?.addEventListener("click", async () => {

await sendEventToProject({
  type: 'html',
  content: '<div id="contenido">¡Dios es amor!</div>',
});

});
