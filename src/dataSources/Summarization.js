const { RESTDataSource } = require('apollo-datasource-rest');
const { structureArrayFromContent } = require('./utils');

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
      fileId,
      Object.entries(settings)
    );
    if (cached) return cached;

    const response = await this.post('sum', { text: content, ...settings })
      .then(summary => structureArrayFromContent(content, summary))
      .then(highlightArray =>
        highlightArray.filter(item => item.text.length > 1)
      );

    this.context.dataSources.cache.save(
      this.constructor.name,
      fileId,
      Object.entries(settings),
      response
    );
    return response;
  }
}

module.exports = SummarizationApi;
