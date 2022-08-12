import {
  ActivityItem,
  Icon,
  Label,
  Separator,
  Stack,
  Text,
} from '@fluentui/react';
import { IpcEvents } from 'const';
import { Fragment, useState } from 'react';
import { useAsync } from 'react-use';
import { Device } from 'types';

export function ConnectedDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  useAsync(async () => {
    window.electron.ipcRenderer.on(IpcEvents.transferDevicesUpdate, (event, devices) => {
      setDevices(devices);
    });
  }, []);
  return (
    <Stack
      styles={{
        root: {
          flex: 1,
          maxHeight: 'calc(100vh - 515px)',
          overflow: 'auto',
          overflowX: 'hidden',
        },
      }}
    >
      <Label>Connected devices</Label>
      {devices.filter(Boolean).map((item) => {
        return (
          <Fragment key={item.deviceId}>
            <ActivityItem
              activityIcon={<Icon iconName="Devices3" />}
              activityDescription={item.deviceId}
              comments={<Text>{item.deviceName}</Text>}
              timeStamp={item.deviceHost}
              styles={{
                root: {
                  width: 300,
                },
              }}
            />
            <Separator />
          </Fragment>
        );
      })}
    </Stack>
  );
}
