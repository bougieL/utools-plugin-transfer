const path = require('path');

const rootPath = path.join(__dirname, '../..');

const dllPath = path.join(__dirname, '../dll');

const srcPath = path.join(rootPath, 'src');
const srcMainPath = path.join(srcPath, 'main');
const srcRendererPath = path.join(srcPath, 'renderer');
const srcTransferPath = path.join(srcPath, 'transfer');

const releasePath = path.join(rootPath, 'release');
const srcNodeModulesPath = path.join(srcPath, 'node_modules');
const assetsPath = path.join(rootPath, 'assets');

const distPath = path.join(rootPath, 'dist');
const distMainPath = path.join(distPath, 'main');
const distRendererPath = path.join(distPath, 'renderer');
const distTransferPath = path.join(distPath, 'transfer');

export default {
  rootPath,
  dllPath,
  srcPath,
  srcMainPath,
  srcRendererPath,
  srcTransferPath,
  releasePath,
  srcNodeModulesPath,
  distPath,
  distMainPath,
  distRendererPath,
  distTransferPath,
  assetsPath,
};
