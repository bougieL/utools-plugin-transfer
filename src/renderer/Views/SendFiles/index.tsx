import { useState } from 'react';
import {
  DefaultButton,
  Label,
  PrimaryButton,
  Stack,
} from 'renderer/components';
import { TransferType } from 'const/Transfer';
import { Dropzone, File } from './Dropzone';

const globalState: {
  files: File[];
} = {
  files: [],
};

export function SendFiles() {
  const [files, setStateFiles] = useState(globalState.files);
  const setFiles = (files: File[]) => {
    setStateFiles(files);
    globalState.files = files;
  };
  const sendFiles = async () => {
    window.preload.sendSSE({
      type: TransferType.sendFiles,
      payload: files.map((item) => {
        return {
          path: item.path,
          size: window.preload.fsStatSync(item.path).size,
        };
      }),
    });
  };
  return (
    <Stack horizontal>
      <Stack horizontalAlign="end" tokens={{ childrenGap: 12 }}>
        <Stack>
          <Label>Transfer files</Label>
          <Dropzone value={files} onChange={setFiles} />
        </Stack>
        <Stack horizontal tokens={{ childrenGap: 12 }}>
          <DefaultButton
            iconProps={{ iconName: 'delete' }}
            disabled={files.length === 0}
            onClick={() => setFiles([])}
          >
            Clear Files
          </DefaultButton>
          <PrimaryButton
            iconProps={{ iconName: 'send' }}
            disabled={files.length === 0}
            onClick={sendFiles}
          >
            Send Files
          </PrimaryButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
