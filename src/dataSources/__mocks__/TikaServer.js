const mockText = require('./../../../fixtures/ner-text');
const TikaServerDataSource = require.requireActual('./../TikaServer.js');

class TikaServer extends TikaServerDataSource {
  async parseFile() {
    return mockText;
  }
}

module.exports = TikaServer;
