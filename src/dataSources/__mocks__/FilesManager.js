const cachedState = require('./../cachedState');

const FileDataSource = require.requireActual('./../FilesManager.js');

class Files extends FileDataSource {
  constructor() {
    super();
    this.state = process.env.INITIAL_FILE_CACHE === 'EMPTY' ? {} : cachedState;
  }

  getAll() {
    return Object.values(this.state);
  }

  getFile(id) {
    console.info(`from mock, id: ${id}`);
    return this.state[id];
  }
}

module.exports = Files;
