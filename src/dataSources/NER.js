const { RESTDataSource } = require('apollo-datasource-rest');
const { setupHighlightArray } = require('../workers');
const objectHash = require('object-hash');

class NERApi extends RESTDataSource {
  constructor() {
    super();
    if (!process.env.NER_URL) {
      throw new Error('missing environment variable: NER_URL');
    }
    this.baseURL = process.env.NER_URL;
    this.fetchEntities = this.fetchEntities.bind(this);
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

  async fetchEntities(fileId, content, settings = {}) {
    const sortedSettings = settings.engines
      ? { ...settings, engines: settings.engines.slice().sort() }
      : settings;
    const data = await this.post('ner', { content, ...sortedSettings });
    const response = await setupHighlightArray(content, data);
    return response;
  }
}

module.exports = NERApi;
