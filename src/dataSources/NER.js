const { RESTDataSource } = require('apollo-datasource-rest');
const labels = require('./../../fixtures/ner-labels');

class NERApi extends RESTDataSource {
  constructor() {
    super();
    // TODO:: move this to .env file
    this.baseURL = 'http://10.42.130.49:8081/';
  }

  fetchEntities(content) {
    return this.post('ner', { content });
  }
}

module.exports = NERApi;
