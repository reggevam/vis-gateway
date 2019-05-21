const worker_ConstructHighlightArray = require('./../workers/constructHighlightArray');
const { Worker } = require('worker_threads');
const { setupHighlightArray } = require('./../workers');
const constructHighlightArray = require('construct-highlight-array');
module.exports = {
  Query: {
    ner: async (_, { content }, { dataSources: { nerApi } }) => {
      const entities = await nerApi.fetchEntities(content);

      // // TODO:: consider moving this to the dataSource
      const response = setupHighlightArray(content, entities);
      return response;
    },
  },
  Entity: {
    __resolveType: () => null,
  },
  EntityBase: {
    __resolveType: () => null,
  },
};
