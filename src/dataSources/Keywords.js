const { RESTDataSource } = require('apollo-datasource-rest');
const { structureArrayFromContent } = require('./utils');

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

    const keywords = await this.post('/phrase', { text: content, ...settings });
    const filteredHighlightArray = await structureArrayFromContent(
      content,
      keywords,
      'text'
    ).then(highlightArray =>
      highlightArray.filter(item => item.text.length > 1)
    );

    this.context.dataSources.cache.save(
      this.constructor.name,
      fileId,
      Object.entries(settings),
      filteredHighlightArray
    );

    return filteredHighlightArray;
  }
}

module.exports = KeywordsApi;
