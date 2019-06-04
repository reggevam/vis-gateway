const { isEqual } = require('lodash');
const { RESTDataSource } = require('apollo-datasource-rest');

class KeywordsApi extends RESTDataSource {
  constructor() {
    super();
    if (!process.env.KEYWORDS_URL) {
      throw new Error('missing environment variable: KEYWORDS_URL');
    }
    this.baseURL = process.env.KEYWORDS_URL;
    this.fetchKeywords = this.fetchKeywords.bind(this);
  }

  async fetchKeywords(fileId, content, settings) {
    const cached = this.context.dataSources.cache.load('entities', fileId);
    if (cached && isEqual(cached.settings, settings)) {
      console.info('returning cached entities');
      return cached.content;
    }
    const response = await this.post('phrase', { text: content, ...settings });
    this.context.dataSources.cache.save('entities', fileId, settings, response);
    return response;
  }
}

module.exports = KeywordsApi;
