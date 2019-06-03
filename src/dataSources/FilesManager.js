const { DataSource } = require('apollo-datasource');
const uuid = require('uuid');
const { setupHighlightArray } = require('../workers');
const cachedState = require('./cachedState');
const { FileNotFoundError } = require('./../errors');

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
      entities: [],
      keywords: [],
      summary: '',
      tags: [],
      // should be dropped
      hasEntities: false,
      // should be dropped
      hasKeywords: false,
    };
    return this.state[fileId];
  }

  getAll() {
    return Object.values(this.state);
  }

  async setEntities(fileId, content, entities, entitiesSettings) {
    const highlightArray = await setupHighlightArray(content, entities);
    this.state[fileId] = {
      ...this.state[fileId],
      entities: highlightArray,
      entitiesSettings,
      hasEntities: true,
    };
    return this.getFile(fileId);
  }

  async setKeywords(fileId, content, keywords, keywordsSettings) {
    // const highlightArray = await setupHighlightArray(content, keywords);
    this.state[fileId] = {
      ...this.state[fileId],
      // keywords: highlightArray,
      keywords, // temporary
      keywordsSettings,
      hasKeywords: true,
    };
    return this.getFile(fileId);
  }

  setSummary(fileId, summary, settings) {
    this.state[fileId] = {
      ...this.state[fileId],
      summary,
      summarySettings: settings,
    };
    return this.getFile(fileId);
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
