
import { useEffect, useRef, useState } from 'react';
import qrcode from 'qrcode';
import {
  Label,
  Link,
  MessageBar,
  MessageBarType,
  Stack,
  Text,
} from 'renderer/components';
import { useAsync, useInterval } from 'renderer/hooks';
import { ServerConfig } from 'types';

interface HostServerProps {
  bottomSlot: React.ReactNode;
  rightSlot: React.ReactNode;
}

export function HostServer({ rightSlot, bottomSlot }: HostServerProps) {
  const [config, setConfig] = useState<ServerConfig>();

  const polling = async () => {
    const config = await window.preload.getServerConfig();
    setConfig(config);
  }

  useAsync(polling, []);

  useInterval(polling, 5000);

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
        styles={{ root: { paddingTop: '20vh' } }}
        verticalAlign="center"
        horizontalAlign="center"
      >
        <Text variant="large">Starting transfer server, please wait...</Text>
        <Text>
          If stuck in this page for a long time, please try exit and restart
          plugin
        </Text>
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
              title='click to copy'
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
