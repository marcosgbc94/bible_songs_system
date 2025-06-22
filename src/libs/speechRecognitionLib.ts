import { errorController } from "./errorLib";

declare global {
  interface Window {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }
}

/**
 * Controla el reconocimiento de voz
 * @returns {Promise<string | undefined>}
 */
export const SpeechRecognitionController = async (): Promise<string | undefined> => {
  const speech = SpeechRecognition.getInstance();

  try {
    const resultado = await speech.listenOnce();
    return resultado;
  } catch (error) {
    errorController("Error de reconocimiento por voz", error, true, true);
    return undefined;
  }
};

class SpeechRecognition {
  private static instance: SpeechRecognition;
  private recognition: any | null = null;
  private isListening: boolean = false;

  private constructor() {
    const RecognitionClass = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!RecognitionClass) {
      errorController("Reconocimiento por voz no soportado.", null, true, false);
      return;
    }

    this.recognition = new RecognitionClass();
    this.recognition.lang = "es-CL";
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
  }

  public static getInstance(): SpeechRecognition {
    if (!SpeechRecognition.instance) {
      SpeechRecognition.instance = new SpeechRecognition();
    }
    return SpeechRecognition.instance;
  }

  public listenOnce(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) return reject("Reconocimiento no disponible.");
      if (this.isListening) return reject("Ya está escuchando.");

      this.recognition.onresult = (event: any) => {
        this.isListening = false;
        const resultado = Array.from(event.results)
          .map((result: any) => result[0].transcript)
          .join("")
          .trim()
          .toLowerCase();
        resolve(resultado);
      };

      this.recognition.onerror = (event: any) => {
        this.isListening = false;
        reject(event.error);
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      this.recognition.start();
      this.isListening = true;
    });
  }
}