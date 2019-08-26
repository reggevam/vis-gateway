const { RESTDataSource } = require('apollo-datasource-rest');
const { setupHighlightArray } = require('../workers');

class NERApi extends RESTDataSource {
  constructor() {
    super();
    if (!process.env.NER_URL) {
      throw new Error('missing environment variable: NER_URL');
    }
    this.baseURL = process.env.NER_URL;
    this.fetchEntities = this.fetchEntities.bind(this);
  }

  async fetchEntities(fileId, content, settings = {}) {
    const sortedSettings = settings.engines
      ? { ...settings, engines: settings.engines.slice().sort() }
      : settings;
    const cached = this.context.dataSources.cache.load(
      this.constructor.name,
      fileId,
      sortedSettings
    );
    if (cached) return cached;
    const data = await this.post('ner', { content, ...sortedSettings });
    const response = await setupHighlightArray(content, data);
    this.context.dataSources.cache.save(
      this.constructor.name,
      fileId,
      sortedSettings,
      response
    );
    return response;
  }
}

module.exports = NERApi;
