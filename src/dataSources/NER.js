const { isEqual } = require('lodash');
const { RESTDataSource } = require('apollo-datasource-rest');
const { setupHighlightArray } = require('../workers');

class NERApi extends RESTDataSource {
  constructor() {
    super();
    if (!process.env.NER_URL) {
      throw new Error('missing environment variable: NER_URL');
    }
    this.baseURL = process.env.NER_URL;
    this.fetchEntities = this.fetchEntities.bind(this);
  }

  async fetchEntities(fileId, content, settings = {}) {
    const cached = this.context.dataSources.cache.load('entities', fileId);
    if (cached && isEqual(cached.settings, settings)) {
      console.info('returning cached entities');
      return cached.content;
    }
    const data = await this.post('ner', { content, ...settings });
    const response = await setupHighlightArray(content, data);
    this.context.dataSources.cache.save('entities', fileId, settings, response);
    return response;
  }
}

module.exports = NERApi;
