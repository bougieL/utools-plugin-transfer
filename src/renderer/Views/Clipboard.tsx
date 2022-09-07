import {
  DefaultButton,
  Label,
  PrimaryButton,
  Stack,
  TextField,
} from '@fluentui/react';
import { TransferType } from 'const/Transfer';

export function Clipboard() {
  const handleSendClick = () => {
    const text = navigator.clipboard.readText();
    if (text) {
      window.preload.sendSSE({
        type: TransferType.sendClipboard,
        payload: text,
      });
    }
  };
  const handleGetClick = () => {
    window.preload.sendSSE({
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
