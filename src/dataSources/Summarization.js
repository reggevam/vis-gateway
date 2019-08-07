const { RESTDataSource } = require('apollo-datasource-rest');
const { findAndTag, setupHighlightArray } = require('./../workers');

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
    const cached = this.context.dataSources.cache.load(
      this.constructor.name,
      fileId
    );
    if (cached) return cached;
    const response = await this.post('sum', { text: content, ...settings });
    this.context.dataSources.cache.save(
      this.constructor.name,
      fileId,
      settings,
      response
    );
    const offsetArray = await findAndTag(content, response);
    return setupHighlightArray(content, offsetArray);
  }
}

module.exports = SummarizationApi;
