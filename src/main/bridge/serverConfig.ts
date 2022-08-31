import { ServerConfig } from 'types';

export namespace ServerConfigManager {
  export let server: ServerConfig | null = null;

  export function set(config: ServerConfig) {
    server = config;
  }
}

export function getServerConfig() {
  return ServerConfigManager.server;
}
