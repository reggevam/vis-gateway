const { isEqual } = require('lodash');

const { RESTDataSource } = require('apollo-datasource-rest');
const { summarization: cachedState } = require('./cachedState');

class SummarizationApi extends RESTDataSource {
  constructor() {
    super();
    if (!process.env.SUMMARIZATION_URL) {
      throw new Error('missing environment variable: SUMMARIZATION_URL');
    }
    this.baseURL = process.env.SUMMARIZATION_URL;
    this.state = cachedState;
    this.fetchSummary = this.fetchSummary.bind(this);
  }

  fetchSummary(fileId, content, { ratio }) {
    if (this.state[fileId] && isEqual(this.state[fileId].settings, { ratio })) {
      console.info('returning cached summary');
      return this.state[fileId].content;
    }
    return this.post('sum', { text: content, ratio });
  }

  saveSummary(fileId, content, settings) {
    this.state[fileId] = {
      content,
      settings,
    };
  }
}

module.exports = SummarizationApi;
