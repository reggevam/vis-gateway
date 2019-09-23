const { RESTDataSource } = require('apollo-datasource-rest');
const { structureArrayFromContent } = require('./utils');
const objectHash = require('object-hash');

class KeywordsApi extends RESTDataSource {
  constructor() {
    super();
    if (!process.env.KEYWORDS_URL) {
      throw new Error('missing environment variable: KEYWORDS_URL');
    }
    this.baseURL = process.env.KEYWORDS_URL;
    this.fetchKeywords = this.fetchKeywords.bind(this);
  }

  cacheKeyFor(request) {
    const body = JSON.parse(request.body.toString());
    return objectHash(
      {
        url: request.url,
        body,
      },
      { unorderedArrays: true, unorderedSets: true, unorderedObjects: true }
    );
    return request.url;
  }

  async fetchKeywords(fileId, content, settings) {
    const response = await this.post('/phrase', {
      text: content,
      ...settings,
    })
      .then(keywords => structureArrayFromContent(content, keywords, 'text'))
      .then(highlightArray =>
        highlightArray.filter(item => item.text.length > 1)
      );
    return response;
  }
}

module.exports = KeywordsApi;
