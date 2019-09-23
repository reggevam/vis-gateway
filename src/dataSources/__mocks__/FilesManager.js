const { files: cachedState } = require('./../../../fixtures/files.cachedState');

const FileDataSource = require.requireActual('./../FilesManager.js');

class Files extends FileDataSource {
  constructor() {
    super();
  }
  initialize() {
    this.cache = {
      get: fileId => {
        return cachedState[fileId];
      },
      set: (fileId, value) => {
        cachedState[fileId] = value;
      },
    };
  }
}

module.exports = Files;
