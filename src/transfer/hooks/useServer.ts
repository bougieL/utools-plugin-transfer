import { createContext, useContext } from 'react';
import { ServerConfig } from 'types';

export const serverContext = createContext<ServerConfig | undefined>(undefined);

export function useServer() {
  return useContext(serverContext);
}
