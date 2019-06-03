const { RESTDataSource } = require('apollo-datasource-rest');

class SummarizationApi extends RESTDataSource {
  constructor() {
    super();
    if (!process.env.SUMMARIZATION_URL) {
      throw new Error('missing environment variable: SUMMARIZATION_URL');
    }
    this.baseURL = process.env.SUMMARIZATION_URL;
  }

  fetchSummary(content, { ratio }) {
    return this.post('sum', { text: content, ratio });
  }
}

module.exports = SummarizationApi;
