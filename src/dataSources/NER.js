const { DataSource } = require('apollo-datasource');
const labels = require('./../../fixtures/ner-labels');
class NERApi extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  fetchEntities(content) {
    //TODO:: implement
    console.warn('delivering fake response!');
    return labels;
  }
}

module.exports = NERApi;
