const objectHash = require('object-hash');
const { DataSource } = require('apollo-datasource');
const { common: cachedState } = require('./cachedState');

class Cache extends DataSource {
  constructor() {
    super();
    this.state = cachedState;
  }

  save(field, fileId, settings, content) {
    console.info(`creating new cache entry for ${field}`);
    const hashedKey = objectHash({
      field,
      fileId,
      settings,
    });
    this.state[hashedKey] = content;
  }

  load(field, fileId, settings) {
    const hashedKey = objectHash({
      field,
      fileId,
      settings,
    });
    const response = this.state[hashedKey];
    if (response) {
      console.info('returning cached result');
    }
    return response;
  }
}

module.exports = Cache;
