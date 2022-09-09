// build as preload.js
import { statSync } from 'fs-extra';
import { setupSever } from './setupServer';
import { getDevices } from './bridge/devices';
import { sendSSE } from './bridge/response';
import { getServerConfig } from './bridge/serverConfig';

setupSever();

window.preload = {
  getDevices,
  sendSSE,
  getServerConfig,
  fsStatSync: statSync,
};
