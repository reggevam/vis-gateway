const { DataSource } = require('apollo-datasource');
const uuid = require('uuid');
const { setupHighlightArray } = require('../workers');
const cachedState = require('./cachedState');

class FilesManager extends DataSource {
  constructor() {
    super();
    this.state = cachedState;
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.setEntities = this.setEntities.bind(this);
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
      hasEntities: false,
      hasKeywords: false,
      tags: [],
    };
    return this.state[fileId];
  }

  getAll() {
    return Object.values(this.state);
  }

  async setEntities(fileId, content, entities) {
    const highlightArray = await setupHighlightArray(content, entities);
    this.state[fileId] = {
      ...this.state[fileId],
      entities: highlightArray,
      hasEntities: true,
    };
    return this.state[fileId];
  }

  getFile(fileId) {
    return this.state[fileId];
  }
}

module.exports = FilesManager;
