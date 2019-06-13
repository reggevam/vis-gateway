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
    const cached = this.context.dataSources.cache.load(
      this.constructor.name,
      fileId,
      settings
    );
    if (cached) return cached;
    const response = await this.post('phrase', { text: content, ...settings });
    this.context.dataSources.cache.save(
      this.constructor.name,
      fileId,
      settings,
      response
    );
    return response;
  }
}

module.exports = KeywordsApi;
