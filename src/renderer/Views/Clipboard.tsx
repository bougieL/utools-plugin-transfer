import {
  DefaultButton,
  Label,
  PrimaryButton,
  Stack,
  TextField,
} from '@fluentui/react';
import { IpcEvents } from 'const';
import { TransferType } from 'const/Transfer';

export function Clipboard() {
  const handleSendClick = () => {
    const text = navigator.clipboard.readText();
    if (text) {
      window.electron.ipcRenderer.send(IpcEvents.transferSSEData, {
        type: TransferType.sendClipboard,
        payload: text,
      });
    }
  };
  const handleGetClick = () => {
    window.electron.ipcRenderer.send(IpcEvents.transferSSEData, {
      type: TransferType.getClipboard,
    });
  };
  return (
    <Stack>
      <Label>Clipboard</Label>
      <Stack tokens={{ childrenGap: 12 }}>
        <TextField />
        <Stack horizontal tokens={{ childrenGap: 12 }} horizontalAlign="end">
          <DefaultButton
            iconProps={{ iconName: 'download' }}
            onClick={handleGetClick}
          >
            Get clipboard
          </DefaultButton>
          <PrimaryButton
            iconProps={{ iconName: 'send' }}
            onClick={handleSendClick}
          >
            Send clipboard
          </PrimaryButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
