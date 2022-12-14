import { Stack } from 'renderer/components';
import { ConnectedDevices } from './ConnectedDevices';
import { HostServer } from './HostServer';
import { SendFiles } from './SendFiles';
import { Clipboard } from './Clipboard';

export function Transfer() {
  return (
    <HostServer
      bottomSlot={<ConnectedDevices />}
      rightSlot={
        <Stack tokens={{ childrenGap: 36 }}>
          <SendFiles />
          <Clipboard />
        </Stack>
      }
    />
  );
}
