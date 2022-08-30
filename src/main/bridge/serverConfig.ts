export namespace ServerConfigManager {
  export interface ServerConfig {
    serverHost: string;
    serverName: string;
  }

  export let server: ServerConfig | null = null;

  export function set(config: ServerConfig) {
    server = config;
  }
}

export function getServerConfig() {
  return ServerConfigManager.server;
}
