const { RESTDataSource } = require('apollo-datasource-rest');
const { structureArrayFromContent } = require('./utils');
const objectHash = require('object-hash');

class SummarizationApi extends RESTDataSource {
  constructor() {
    super();
    if (!process.env.SUMMARIZATION_URL) {
      throw new Error('missing environment variable: SUMMARIZATION_URL');
    }
    this.baseURL = process.env.SUMMARIZATION_URL;
    this.fetchSummary = this.fetchSummary.bind(this);
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

  async fetchSummary(fileId, content, settings) {
    const response = await this.post('sum', { text: content, ...settings })
      .then(summary => structureArrayFromContent(content, summary))
      .then(highlightArray =>
        highlightArray.filter(item => item.text.length > 1)
      );
    return response;
  }
}

module.exports = SummarizationApi;
