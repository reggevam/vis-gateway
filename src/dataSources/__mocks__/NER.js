const { DataSource } = require('apollo-datasource');
const labels = require('./../../../fixtures/ner-labels');

class NERApi extends DataSource {
  initialize(config) {
    this.context = config.context;
  }

  fetchEntities() {
    return labels;
  }
}

module.exports = NERApi;
