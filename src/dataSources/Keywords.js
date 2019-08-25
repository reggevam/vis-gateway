const { RESTDataSource } = require('apollo-datasource-rest');
const { findAndTag, setupHighlightArray } = require('./../workers');

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
      Object.entries(settings)
    );
    if (cached) return cached;

    const response = await this.post('/phrase', { text: content, ...settings });
    const offsetArray = await findAndTag(content, response);
    const highlighArray = setupHighlightArray(content, offsetArray);

    this.context.dataSources.cache.save(
      this.constructor.name,
      fileId,
      Object.entries(settings),
      highlighArray
    );

    return highlighArray;
  }
}

module.exports = KeywordsApi;
