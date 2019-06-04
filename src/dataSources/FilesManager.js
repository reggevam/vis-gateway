const { DataSource } = require('apollo-datasource');
const uuid = require('uuid');
const { files: cachedState } = require('./cachedState');
const { FileNotFoundError } = require('./../errors');

class FilesManager extends DataSource {
  constructor() {
    super();
    this.state = cachedState;
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getFile = this.getFile.bind(this);
  }

  initialize(config) {
    this.context = config.context;
  }

  create(file) {
    const fileId = uuid.v4();
    this.state[fileId] = {
      ...file,
      id: fileId,
    };
    return this.state[fileId];
  }

  getAll() {
    return Object.values(this.state);
  }

  getFile(fileId) {
    const file = this.state[fileId];
    if (!file) {
      throw FileNotFoundError(fileId);
    }
    return file;
  }
}

module.exports = FilesManager;
