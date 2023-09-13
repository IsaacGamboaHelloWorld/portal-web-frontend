const CONFIG = require('./protractor.conf').config;

CONFIG.chromeDriver = '/usr/bin/chromedriver';
CONFIG.capabilities = {
  browserName: 'chrome',
  chromeOptions: {
    args: [
      '--headless',
      '--no-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage'
    ]
  }
};

exports.config = CONFIG;
