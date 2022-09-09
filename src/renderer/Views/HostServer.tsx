import {
  Label,
  Link,
  MessageBar,
  MessageBarType,
  Stack,
  Text,
} from 'renderer/components';
import { useEffect, useRef, useState } from 'react';
import qrcode from 'qrcode';
import { useAsync, useInterval } from 'renderer/hooks';
import { ServerConfig } from 'types';

interface HostServerProps {
  bottomSlot: React.ReactNode;
  rightSlot: React.ReactNode;
}

export function HostServer({ rightSlot, bottomSlot }: HostServerProps) {
  const [config, setConfig] = useState<ServerConfig>();

  useAsync(async () => {
    const config = await window.preload.getServerConfig();
    setConfig(config);
  }, []);

  useInterval(async () => {
    const config = await window.preload.getServerConfig();
    setConfig(config);
  }, 5000);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!config?.serverHost) return;
    qrcode.toCanvas(
      canvasRef.current,
      config.serverHost,
      {
        width: 250,
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
    return (
      <Stack
        styles={{ root: { flex: 1 } }}
        verticalAlign="center"
        horizontalAlign="center"
      >
        <Text>Starting transfer server...</Text>
      </Stack>
    );
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
            window.utools.shellOpenExternal(config.serverHost);
          }}
        >
          Open transfer page
        </Link>
      </MessageBar>
      <Stack horizontal tokens={{ childrenGap: 24 }}>
        <Stack tokens={{ childrenGap: 24 }}>
          <Stack>
            <Label>Qrcode</Label>
            <canvas
              ref={canvasRef}
              style={{ cursor: 'pointer' }}
              onClick={() => {
                navigator.clipboard.writeText(config.serverHost);
                window.renderer.showNotification('Transfer page url copied 😄');
              }}
            />
          </Stack>
          {bottomSlot}
        </Stack>
        {rightSlot}
      </Stack>
    </Stack>
  );
}
