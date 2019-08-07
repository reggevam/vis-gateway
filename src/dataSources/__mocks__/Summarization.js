const SummarizationDataSource = require.requireActual('./../Summarization.js');

const { entities: cachedState } = require.requireActual('./../cachedState.js');
const mock = require('../../../fixtures/summary');

class SummarizationApi extends SummarizationDataSource {
  constructor() {
    super();
    this.state = cachedState;
  }
  async post() {
    return mock;
  }
}

module.exports = SummarizationApi;
