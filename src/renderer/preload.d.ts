// import { app, dialog, ipcRenderer } from 'electron';
// import { Channels } from 'main/preload';

declare global {
  interface Window {
    getDevices(): Device[]
  }
}

export {};
