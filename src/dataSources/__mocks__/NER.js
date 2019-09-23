const NERDataSource = require.requireActual('./../NER.js');
const { setupHighlightArray } = require('../../workers');
const labels = require('./../../../fixtures/ner-labels');
const text = require('./../../../fixtures/ner-text');

class NERApi extends NERDataSource {
  constructor() {
    super();
  }
  fetchEntities() {
    return setupHighlightArray(text, labels);
  }
}

module.exports = NERApi;
