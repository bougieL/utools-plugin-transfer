// build as preload.js
import { setupSever } from './setupServer';
import { ipcRenderer, IpcRendererEvent, shell } from 'electron';

setupSever();

window.electron = {
  ipcRenderer: {
    send(channel: string, args: unknown[]) {
      ipcRenderer.send(channel, args);
    },
    on(channel: string, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => ipcRenderer.removeListener(channel, subscription);
    },
    invoke(channel: string, args: unknown[]) {
      return ipcRenderer.invoke(channel, args);
    },
  },
  shell: {
    openExternal(url: string) {
      return shell.openExternal(url)
    }
  }
}
