import { Response } from 'express';

export namespace ResponseManager {
  export const responses = new Map<string, Response>();

  export function addResponse(deviceId: string, res: Response) {
    responses.set(deviceId, res);
  }

  export function removeResponse(deviceId: string) {
    responses.delete(deviceId);
  }

  export function toEventStreamData(data: any) {
    const str = typeof data === 'string' ? data : JSON.stringify(data);
    return `data: ${str}\n\n`;
  }
}

export function sendSSE(data: { type: string, payload: any }) {
  Array.from(ResponseManager.responses.values()).forEach(res => {
    res.write(ResponseManager.toEventStreamData(data))
  })
}
