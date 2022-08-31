import {
  ActivityItem,
  Icon,
  Label,
  Separator,
  Stack,
  Text,
} from '@fluentui/react';
import { Fragment, useState } from 'react';
import { useAsync, useInterval } from 'react-use';
import { Device } from 'types';

export function ConnectedDevices() {
  const [devices, setDevices] = useState<Device[]>([]);
  useInterval(() => {
    const devices = window.electron.getDevices()
    console.log(devices)
    setDevices(devices)
  }, 1000)
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
      {devices.map((item) => {
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
