/**
 *
 * @type {import('electron-builder').Configuration}
 */
module.exports = {
  directories: {
    output: 'dist/app',
    buildResources: 'build'
  },
  appId: "com.streamerbuddy.app",
  productName: "Streamer Buddy",
  win: {
    target: ["nsis","zip","tar.gz"],
    icon: "build/icon.ico",
    signingHashAlgorithms: ["sha1","sha256"]
  },
  nsis: {
    oneClick: false,
    perMachine: false,
    allowElevation: true,
    allowToChangeInstallationDirectory: true,
    // installerIcon: "build/installerIcon",
    // uninstallerIcon: "build/uninstallerIcon",
    differentialPackage: true,
    runAfterFinish: true,
    createStartMenuShortcut: true,
    menuCategory: "StreamerBuddy"
  },
  mac: {

  },
  pkg: {

  },
  publish: {
    provider: "github",
    owner: "mithom",
    vPrefixedTagName: true,
    // host: "github.com", //enabling this for some reason makes it use the wrong url
    protocol: "https",
    releaseType: "draft",
    publishAutoUpdate: true
  }
}
