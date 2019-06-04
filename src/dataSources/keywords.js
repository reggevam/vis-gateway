const { isEqual } = require('lodash');
const { RESTDataSource } = require('apollo-datasource-rest');
const { keywords: cachedState } = require('./cachedState');

class KeywordsApi extends RESTDataSource {
  constructor() {
    super();
    if (!process.env.KEYWORDS_URL) {
      throw new Error('missing environment variable: KEYWORDS_URL');
    }
    this.state = cachedState;
    this.baseURL = process.env.KEYWORDS_URL;
    this.fetchKeywords = this.fetchKeywords.bind(this);
  }

  async fetchKeywords(fileId, content, settings) {
    if (this.state[fileId] && isEqual(this.state[fileId].settings, settings)) {
      console.info('returning cached keywords');
      return this.state[fileId].content;
    }
    return this.post('phrase', { text: content, ...settings });
  }

  saveKeywords(fileId, content, settings) {
    this.state[fileId] = {
      settings,
      content,
    };
  }
}

module.exports = KeywordsApi;
