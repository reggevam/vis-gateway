const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers, schemaDirectives } = require('./schema');
const formatError = require('./formatErrors');
const { TemplateApi } = require('./dataSources');
const { NERApi } = require('./dataSources');
const context = async ({ req }) => req;

const dataSources = () => ({
  nerApi: new NERApi(),
});

const server = new ApolloServer({
  tracing: true,
  typeDefs,
  resolvers,
  schemaDirectives,
  formatError,
  dataSources,
  context,
});

module.exports = {
  typeDefs,
  resolvers,
  schemaDirectives,
  ApolloServer,
  formatError,
  server,
  dataSources,
  context,
};
