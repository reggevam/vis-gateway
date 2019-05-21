const { DataSource } = require('apollo-datasource');

class NERApi extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {
    this.context = config.context;
  }

  fetchEntities(content) {
    //TODO:: implement
    throw new Error('[NERApi] - fetchEntities not implemented');
  }
}

module.exports = NERApi;
