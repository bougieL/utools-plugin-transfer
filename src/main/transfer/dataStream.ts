import { clipboard } from 'electron';
import { Router, Request } from 'express';
import fs from 'fs-extra';
import multer from 'multer';
import path from 'path';
import os from 'os';

export function setupDataStreamRouter(router: Router) {
  router.get('/file/:path', async (req: Request<{ path: string }>, res) => {
    const { params } = req;
    const fp = decodeURIComponent(params.path);
    const stat = await fs.stat(fp);
    res.header('Content-Length', String(stat.size));
    res.header('Content-Disposition', 'attachment');
    const readStream = fs.createReadStream(decodeURIComponent(params.path));
    readStream.pipe(res);
  });

  const storage = multer.diskStorage({
    destination(req, file, cb) {
      const downloads = path.join(os.homedir(), 'downloads');
      fs.ensureDirSync(downloads);
      cb(null, downloads);
    },
    filename(req, file, cb) {
      const t = Date.now();
      const exts = file.originalname.split('.');
      const ext = exts.length > 1 ? exts.pop() : '';
      cb(null, `${exts.join('.')}-${t}${ext ? `.${ext}` : ''}`);
    },
  });

  const upload = multer({ storage });

  router.post('/files', upload.array('files'), async (req, res) => {
    const files = Array.isArray(req.files) ? req.files : req.files?.files;
    if (files && files.length > 0) {
      window.renderer.showNotification('Receive files successfully 😄', () => {
        window.utools.shellShowItemInFolder(files[0].path);
      });
    }
    res.send('ok');
  });

  router.get('/clipboard', async (req, res) => {
    res.send(clipboard.readText());
  });

  router.post('/clipboard', async (req: Request<any, any>, res) => {
    if (req.body) {
      clipboard.writeText(req.body.data);
      window.renderer.showNotification('Clipboard updated 😄');
    }
    res.send('ok');
  });
}
