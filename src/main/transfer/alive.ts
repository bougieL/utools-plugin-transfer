import { IpcEvents } from 'const';
import { TransferType } from 'const/Transfer';
import { ipcMain } from 'electron';
import { Router, Response } from 'express';
import { Device } from 'types';
import { getServerName, getServerHost } from '../utils';

namespace DevicesManager {
  const devices: Device[] = [];

  function notify() {
    ipcMain.emit(IpcEvents.transferDevicesUpdate, devices);
  }

  export function connect(device: Device) {
    const index = devices.findIndex(
      (item) => item.deviceId === device.deviceId
    );
    if (index < 0) {
      devices.unshift(device);
      notify();
    }
  }

  export function disconnect(deviceId: string) {
    const index = devices.findIndex((item) => item.deviceId === deviceId);
    if (index > -1) {
      delete devices[index];
      notify();
    }
  }
}

export function setupAliveRouter(router: Router) {
  const timerMap = new Map<string, ReturnType<typeof setTimeout>>();
  router.get('/deviceAlivePolling', async (req, res) => {
    const { query } = req;
    const deviceId = query.deviceId as string;
    DevicesManager.connect({
      deviceId,
      deviceName: query.deviceName as string,
      deviceHost: req.ip,
    });
    clearTimeout(timerMap.get(deviceId));
    timerMap.set(
      deviceId,
      setTimeout(() => {
        DevicesManager.disconnect(deviceId);
        timerMap.delete(deviceId);
      }, 10000)
    );
    res.status(200).send({
      serverName: getServerName(),
      serverHost: await getServerHost(),
    });
  });

  const responses = new Map<string, Response>();
  const timers = new Map<string, ReturnType<typeof setInterval>>();

  ipcMain.on(IpcEvents.transferSSEData, (_, payload) => {
    // console.log('on ', IpcEvents.transferSSEData, payload);
    Array.from(responses.values()).forEach((res) => {
      res.write(toEventStreamData(payload));
    });
    // res.write(toEventStreamData(payload));
  });

  router.get('/serverAliveSse', async (req, res) => {
    const deviceId = req.query.deviceId as string;
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    const heartbeatData = toEventStreamData({
      type: TransferType.heartbeat,
      payload: {
        serverName: getServerName(),
        serverHost: await getServerHost(),
      },
    });
    res.write(heartbeatData);
    clearInterval(timers.get(deviceId));
    const timer = setInterval(() => {
      res.write(heartbeatData);
    }, 5000);
    timers.set(deviceId, timer);
    responses.set(deviceId, res);
  });
}

function toEventStreamData(data: any) {
  const str = typeof data === 'string' ? data : JSON.stringify(data);
  return `data: ${str}\n\n`;
}
