const { isEqual } = require('lodash');
const { RESTDataSource } = require('apollo-datasource-rest');
const { entities: cachedState } = require('./cachedState');
const { setupHighlightArray } = require('../workers');

class NERApi extends RESTDataSource {
  constructor() {
    super();
    if (!process.env.NER_URL) {
      throw new Error('missing environment variable: NER_URL');
    }
    this.state = cachedState;
    this.baseURL = process.env.NER_URL;
    this.fetchEntities = this.fetchEntities.bind(this);
    this.saveEntities = this.saveEntities.bind(this);
  }

  async fetchEntities(fileId, content, settings = {}) {
    if (this.state[fileId] && isEqual(this.state[fileId].settings, settings)) {
      console.info('returning cached entities');
      return this.state[fileId].content;
    }
    const data = await this.post('ner', { content, ...settings });
    return setupHighlightArray(content, data);
  }

  saveEntities(fileId, content, settings) {
    this.state[fileId] = {
      content,
      settings,
    };
  }
}

module.exports = NERApi;
