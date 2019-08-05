const { RESTDataSource } = require('apollo-datasource-rest');

class KeyPhrases extends RESTDataSource {
  constructor() {
    super();
    if (!process.env.KEY_PHRASES) {
      throw new Error('missing environment variable: KEY_PHRASES');
    }
    this.baseURL = process.env.KEY_PHRASES;
    this.fetchKeyPhrases = this.fetchKeyPhrases.bind(this);
  }

  async fetchKeyPhrases(fileId, content, settings) {
    const cached = this.context.dataSources.cache.load(
      this.constructor.name,
      fileId
    );
    if (cached) return cached;
    const response = await this.post('/phrase', { text: content, ...settings });
    this.context.dataSources.cache.save(
      this.constructor.name,
      fileId,
      settings,
      response
    );
    return response;
  }
}

module.exports = KeyPhrases;
