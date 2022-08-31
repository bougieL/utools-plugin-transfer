import { TransferType } from 'const/Transfer';
import { Device, ServerConfig } from 'types';

declare global {
  interface Window {
    electron: {
      // ipcRenderer: {
      //   send(channel: string, ...args: any[]): void;
      //   on(
      //     channel: string,
      //     func: (...args: any[]) => void
      //   ): (() => void) | undefined;
      //   invoke(channel: string, ...args: any[]): Promise<any>;
      // };
      shell: {
        openExternal(url: string): Promse<void>;
      };
      sendSSE(data: { type: TransferType; payload?: any }): void;
      getDevices(): Device[];
      getServerConfig(): ServerConfig | null;
    };
  }
}

export {};
