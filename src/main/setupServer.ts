import express from 'express';
import address from 'address';
import cookieParser from 'cookie-parser';
import { getServerName, getServerPort } from './utils';
import { router as transferRouter } from './transfer';
import { ServerConfigManager } from './bridge/serverConfig';

const app = express();

app.use(cookieParser());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use('/transfer', transferRouter);

export async function setupSever() {
  const port = await getServerPort();
  return app.listen(port, async () => {
    const host = `http://${address.ip()}:${port}`;
    ServerConfigManager.set({
      serverHost: `${host}/transfer`,
      serverName: getServerName(),
    })
  });
}
