import { listenerEventController } from './libs/eventBusLib';
//import { listen } from '@tauri-apps/api/event';
// const unlisten = await getCurrentWebview().listen('event-name', (event) => {
//     console.log(`Got error: ${event.payload}`);
// });

// unlisten();


window.addEventListener('DOMContentLoaded', async () => {console.log('h')
  listenerEventController((datos) => {
    console.log('Recibido:', datos);
  });
});

// listen('mostrar_texto', event => {
//     console.log(event.payload)
//   const { htmlDinamico } = event.payload as { htmlDinamico: string };
//   // Aquí actualizas el DOM con el texto recibido
//   const contenedor = document.getElementById('texto');
//   if (contenedor) contenedor.innerHTML = htmlDinamico;
//   h();
// });

// const h = () => {
//     console.log('fg')
// }

