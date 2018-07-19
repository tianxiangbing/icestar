const { app, autoUpdater, dialog } = require('electron');

const Updater = {
    init() {
        require('update-electron-app')({
            repo: 'https://github.com/tianxiangbing/mock',
            updateInterval: '1 hour',
            logger: require('electron-log')
          })
    }
}
module.exports =Updater;