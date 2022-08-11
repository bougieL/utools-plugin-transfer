export enum IpcEvents {
  electronAppGetPath = '__transfer__.electron.app.getPath',
  electronAppGetVersion = '__transfer__.electron.app.getVersion',
  electronDialogShowOpenDialog = '__transfer__.electron.dialog.showOpenDialog',
  electronDialogShowOpenDialogSync = '__transfer__.electron.dialog.showOpenDialogSync',
  transferDevicesUpdate = '__transfer__.transfer.devices.update',
  transferServerStarted = '__transfer__.transfer.server.started',
  transferSSEData = '__transfer__.transfer.sse.data',
}
