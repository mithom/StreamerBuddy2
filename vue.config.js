module.exports = {
  pluginOptions: {
    electronBuilder: {
      // List native deps here if they don't work
      externals: [],
      // If you are using Yarn Workspaces, you may have multiple node_modules folders
      // List them all here so that VCP Electron Builder can find them
      nodeModulesPath: ['./node_modules'],
      // Use this to change the entrypoint of your app's main process
      mainProcessFile: 'src/background.js',
      // Provide an array of files that, when changed, will recompile the main process and restart Electron
      // Your main process file will be added by default
      mainProcessWatch: ['src/background/*'],

      builderOptions:{
        appId: "com.streamerbuddy.app",
        productName: "Streamer Buddy",
        directories:{
        },
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
          host: "github.com",
          protocol: "https",
          releaseType: "draft",
          publishAutoUpdate: true
        }
      },
    }
  }
}
