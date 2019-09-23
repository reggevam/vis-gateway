const SummarizationDataSource = require.requireActual('./../Summarization.js');

const mock = require('../../../fixtures/summary');

class SummarizationApi extends SummarizationDataSource {
  constructor() {
    super();
  }
  async post() {
    return mock;
  }
}

module.exports = SummarizationApi;
