import { TransferType } from 'const/Transfer';
import { Router, Response } from 'express';
import { DevicesManager } from 'main/bridge/devices';
import { ResponseManager } from 'main/bridge/response';
import { getServerName, getServerHost } from '../utils';

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

  const timers = new Map<string, ReturnType<typeof setInterval>>();

  router.get('/serverAliveSse', async (req, res) => {
    const deviceId = req.query.deviceId as string;
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });
    const heartbeatData = ResponseManager.toEventStreamData({
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
    ResponseManager.addResponse(deviceId, res)
  });
}
