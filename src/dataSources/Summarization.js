const { isEqual } = require('lodash');
const { RESTDataSource } = require('apollo-datasource-rest');

class SummarizationApi extends RESTDataSource {
  constructor() {
    super();
    if (!process.env.SUMMARIZATION_URL) {
      throw new Error('missing environment variable: SUMMARIZATION_URL');
    }
    this.baseURL = process.env.SUMMARIZATION_URL;
    this.fetchSummary = this.fetchSummary.bind(this);
  }

  async fetchSummary(fileId, content, settings) {
    const cached = this.context.dataSources.cache.load('entities', fileId);
    if (cached && isEqual(cached.settings, settings)) {
      console.info('returning cached entities');
      return cached.content;
    }
    const response = await this.post('sum', { text: content, ...settings });
    this.context.dataSources.cache.save('entities', fileId, settings, response);
    return response;
  }
}

module.exports = SummarizationApi;
