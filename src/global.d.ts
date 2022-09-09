import { TransferType } from 'const/Transfer';
import { Device, ServerConfig } from 'types';
import 'utools-api-types';

declare global {
  interface Window {
    preload: {
      sendSSE(data: { type: TransferType; payload?: any }): void;
      getDevices(): Device[];
      getServerConfig(): Promise<ServerConfig>;
    };
    renderer: {
      showNotification(body: string, onClick?: () => void): void;
    };
    utools: UToolsApi;
  }
}
