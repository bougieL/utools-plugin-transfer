import {
  ActivityItem,
  Icon,
  Label,
  Separator,
  Stack,
  Text,
} from 'renderer/components';
import { Fragment, useState } from 'react';
import { useInterval } from 'renderer/hooks';
import { Device } from 'types';

export function ConnectedDevices() {
  const [devices, setDevices] = useState<Device[]>([]);

  useInterval(() => {
    const devices = window.preload.getDevices()
    setDevices(devices)
  }, 3000)

  return (
    <Stack
      styles={{
        root: {
          flex: 1,
          maxHeight: 'calc(100vh - 370px)',
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
                  width: 250,
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
