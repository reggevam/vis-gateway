const { RESTDataSource } = require('apollo-datasource-rest');

class NERApi extends RESTDataSource {
  constructor() {
    super();
    if (!process.env.NER_URL) {
      throw new Error('missing environment variable: NER_URL');
    }
    this.baseURL = process.env.NER_URL;
  }

  fetchEntities(content, { engines }) {
    return this.post('ner', { content, engines });
  }
}

module.exports = NERApi;
