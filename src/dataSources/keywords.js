const { RESTDataSource } = require('apollo-datasource-rest');

class KeywordsApi extends RESTDataSource {
  constructor() {
    super();
    if (!process.env.KEYWORDS_URL) {
      throw new Error('missing environment variable: KEYWORDS_URL');
    }
    this.baseURL = process.env.KEYWORDS_URL;
  }

  fetchKeywords(content, { ratio, words }) {
    return this.post('phrase', { text: content, ratio, words });
  }
}

module.exports = KeywordsApi;
