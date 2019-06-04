const { files: cachedState } = require('./../cachedState');

const FileDataSource = require.requireActual('./../FilesManager.js');

class Files extends FileDataSource {
  constructor() {
    super();
    this.state = process.env.INITIAL_FILE_CACHE === 'EMPTY' ? {} : cachedState;
  }
}

module.exports = Files;
