const { DataSource } = require('apollo-datasource');
const { common: cachedState } = require('./cachedState');

class Cache extends DataSource {
  constructor() {
    super();
    this.state = cachedState;
  }

  save(field, fileId, settings, content) {
    if (!this.state[field]) {
      this.state[field] = {};
    }
    this.state[field][fileId] = {
      settings,
      content,
    };
  }

  load(field, fileId) {
    if (!this.state[field]) {
      return null;
    }
    return this.state[field][fileId];
  }
}

module.exports = Cache;
