const { DataSource } = require('apollo-datasource');
const uuid = require('uuid');
const { FileNotFoundError } = require('./../errors');

class FilesManager extends DataSource {
  constructor() {
    super();
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getFile = this.getFile.bind(this);
    this.state = {};
  }

  initialize(config) {
    this.cache = config.cache;
  }

  async create(file) {
    const fileId = uuid.v4();
    const response = {
      ...file,
      id: fileId,
    };
    await this.cache.set(fileId, JSON.stringify(response));
    return response;
  }

  getAll() {
    return Object.values(this.state);
  }

  async getFile(fileId) {
    const file = await this.cache.get(fileId);
    if (!file) {
      throw FileNotFoundError(fileId);
    }
    return JSON.parse(file);
  }
}

module.exports = FilesManager;
