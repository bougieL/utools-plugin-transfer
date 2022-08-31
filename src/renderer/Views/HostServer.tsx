import {
  Label,
  Link,
  MessageBar,
  MessageBarType,
  Stack,
} from '@fluentui/react';
import { useEffect, useRef, useState } from 'react';
import qrcode from 'qrcode';
import { useAsync } from 'react-use';
import { ServerConfig } from 'types';
import { IpcEvents } from 'const';

interface HostServerProps {
  bottomSlot: React.ReactNode;
  rightSlot: React.ReactNode;
}

export function HostServer({ rightSlot, bottomSlot }: HostServerProps) {
  const [config, setConfig] = useState<ServerConfig>();
  useAsync(async () => {
    window.electron.ipcRenderer.on(
      IpcEvents.transferServerStarted,
      (event, c) => {
        setConfig(c);
      }
    );
  }, []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!config?.serverHost) return;
    qrcode.toCanvas(
      canvasRef.current,
      config.serverHost,
      {
        width: 300,
        scale: 0,
        margin: 0,
      },
      (error) => {
        if (error) console.error(error);
        console.log('success!');
      }
    );
  }, [config?.serverHost]);
  if (!config) {
    return null;
  }
  return (
    <Stack tokens={{ childrenGap: 12 }} styles={{ root: { flex: 1 } }}>
      <MessageBar messageBarType={MessageBarType.success}>
        Start transfer server in {config.serverName} success, scan the qrcode to
        transfer files.
        <Link
          href={config.serverHost}
          target="_blank"
          onClick={(event) => {
            event.preventDefault();
            window.electron.shell.openExternal(config.serverHost);
          }}
        >
          Open transfer page
        </Link>
      </MessageBar>
      <Stack horizontal tokens={{ childrenGap: 36 }}>
        <Stack tokens={{ childrenGap: 24 }}>
          <Stack>
            <Label>Qrcode</Label>
            <canvas ref={canvasRef} />
          </Stack>
          {bottomSlot}
        </Stack>
        {rightSlot}
      </Stack>
    </Stack>
  );
}
