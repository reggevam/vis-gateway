const {
  context: defaultContext,
  typeDefs,
  resolvers,
  ApolloServer,
  schemaDirectives,
  dataSources,
  formatError,
} = require('../src');

/**
 * Integration testing utils
 */

const constructTestServer = ({ context = defaultContext } = {}) => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    formatError,
    dataSources,
    context,
  });

  return { server, dataSources };
};

module.exports.constructTestServer = constructTestServer;
