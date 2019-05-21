const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers, schemaDirectives } = require('./schema');
const formatError = require('./formatErrors');
const { TemplateApi } = require('./dataSources');

const context = async ({ req }) => req;

const dataSources = () => ({
  templateApi: new TemplateApi(),
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
