const { setupHighlightArray } = require('./../workers');

module.exports = {
  Query: {
    ner: async (_, { content }, { dataSources: { nerApi } }) => {
      const entities = await nerApi.fetchEntities(content);

      // // TODO:: consider moving this to the dataSource
      return setupHighlightArray(content, entities);
    },
  },
};
