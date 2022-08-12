declare global {
  interface Window {
    getDevices(): Device[]
  }
}

export {};
