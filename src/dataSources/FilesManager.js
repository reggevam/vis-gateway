const { DataSource } = require('apollo-datasource');
const { setupHighlightArray } = require('../workers');
const uuid = require('uuid');

/* 
  state: {
    fileId: {
      id,

      entities: bool,
      keywords: bool,
      content: string,
      tags: [{
        content: string,
        isKeyword: bool
        isEntity: bool
        entityType: enum
      }]
    }
  }
*/

class FilesManager extends DataSource {
  constructor(initialState = {}) {
    super();
    this.state = initialState;
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
        hasEntities: false,
        hasKeywords: false,
        tags: [],
      },
    };
    return fileId;
  }

  getAll() {
    return Object.values(this.state);
  }

  async setEntities(fileId, entities) {
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
    return this.state[id];
  }
}

module.exports = FilesManager;
