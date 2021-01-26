import {readFileSync} from 'fs';
const version = readFileSync(require.resolve('electron/dist/version'), 'utf8');
const releases = require('electron-releases/lite.json');

const release = releases.find(r => r.version === version);

if (!release) {
    throw new Error(`Can't find electron release info for version: ${version}
  Try run:
  npm update electron-releases
  And try again`);
}
const chrome = release.deps.chrome.split('.')[0];
const node = release.deps.node;

export {chrome, node};

