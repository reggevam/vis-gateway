const NERDataSource = require.requireActual('./../NER.js');
const { setupHighlightArray } = require('../../workers');
const labels = require('./../../../fixtures/ner-labels');
const text = require('./../../../fixtures/ner-text');

const { entities: cachedState } = require.requireActual('./../cachedState.js');

class NERApi extends NERDataSource {
  constructor() {
    super();
    this.state = cachedState;
  }
  fetchEntities() {
    return setupHighlightArray(text, labels);
  }
}

module.exports = NERApi;
