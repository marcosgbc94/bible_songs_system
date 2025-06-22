/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_JSON_SONGS_NAME: string;
  readonly VITE_JSON_BIBLE_NAME: string;
  readonly VITE_LOG_NAME: string;
  readonly VITE_PROJECTOR_ID_WINDOW: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}