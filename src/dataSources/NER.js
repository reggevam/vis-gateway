const { RESTDataSource } = require('apollo-datasource-rest');

class NERApi extends RESTDataSource {
  constructor() {
    super();
    if (!process.env.NER_URL) {
      throw new Error('missing environment variable: NER_URL');
    }
    this.baseURL = process.env.NER_URL;
  }

  fetchEntities(content) {
    return this.post('ner', { content });
  }
}

module.exports = NERApi;
