import { Device } from 'types';

export namespace DevicesManager {
  export const devices: Device[] = [];

  export function connect(device: Device) {
    const index = devices.findIndex(
      (item) => item?.deviceId === device.deviceId
    );
    if (index < 0) {
      devices.unshift(device);
    }
  }

  export function disconnect(deviceId: string) {
    const index = devices.findIndex((item) => item.deviceId === deviceId);
    if (index > -1) {
      delete devices[index];
    }
  }
}

export function getDevices() {
  return DevicesManager.devices.filter(Boolean);
}
