import axios from 'axios';
import { v4 } from 'uuid';
import md5 from 'md5';

export const baseURL =
  process.env.NODE_ENV === 'development'
    ? `http://${process.env.HOST_IP}:1236`
    : '';

export const http = axios.create({
  baseURL,
  withCredentials: true,
  params: {
    deviceId: getDeviceId(),
    deviceName: getDeviceName(),
  },
});

function getDeviceId() {
  const KEY = 'deviceId';
  let deviceId = localStorage.getItem(KEY);
  if (!deviceId) {
    deviceId = v4();
    localStorage.setItem(KEY, deviceId);
  }
  return deviceId;
}

function getDeviceName() {
  const matche = navigator.userAgent.match(/^[^(]+\((\w+)/)?.[1];
  return `${matche ? `${matche}@` : ''}${md5(navigator.userAgent)}`;
}

export const baseQuery = `deviceId=${getDeviceId()}&deviceName=${getDeviceName()}`;
