const { DataSource } = require('apollo-datasource');
const uuid = require('uuid');
const { setupHighlightArray } = require('./../../workers');
const dummyContent = require('../../../fixtures/ner-text');

class Files extends DataSource {
  constructor() {
    super();
    this.state = {
      1: {
        id: 1,
        content: dummyContent,
        hasEntities: false,
        hasKeywords: false,
      },
    };
  }

  initialize(config) {
    this.context = config.context;
  }

  create(file) {
    const fileId = uuid.v4();
    this.state = {
      ...this.state,
      [fileId]: {
        ...file,
        id: fileId,
        hasEntities: false,
        hasKeywords: false,
        tags: [],
      },
    };

    return this.state[fileId];
  }

  getAll() {
    return Object.values(this.state);
  }

  async setEntities(fileId, content, entities) {
    const highlightArray = await setupHighlightArray(content, entities);
    this.state = {
      ...this.state,
      [fileId]: {
        ...this.state[fileId],
        entities: highlightArray,
        hasEntities: true,
      },
    };
    return this.state[fileId];
  }

  getFile(id) {
    console.info(`from mock, id: ${id}`);
    return this.state[id];
  }
}

module.exports = Files;
