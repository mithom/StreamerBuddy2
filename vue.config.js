module.exports = {
  pluginOptions: {
    electronBuilder: {
      // List native deps here if they don't work
      externals: [],
      // If you are using Yarn Workspaces, you may have multiple node_modules folders
      // List them all here so that VCP Electron Builder can find them
      nodeModulesPath: ['./node_modules'],
      builderOptions:{
        // options placed here will be merged with default configuration and passed to electron-builder

        // Use this to change the entrypoint of your app's main process
        mainProcessFile: 'src/background.js',
        // Provide an array of files that, when changed, will recompile the main process and restart Electron
        // Your main process file will be added by default
        mainProcessWatch: ['src/background/*'],
      }
    }
  }
}
