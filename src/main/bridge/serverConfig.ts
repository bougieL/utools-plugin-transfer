import { getServerHost, getServerName } from 'main/utils';
import { ServerConfig } from 'types';

export async function getServerConfig(): Promise<ServerConfig> {
  return {
    serverHost: `${await getServerHost()}/transfer`,
    serverName: getServerName(),
  }
}
