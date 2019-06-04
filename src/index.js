const { ApolloServer } = require('apollo-server');
const { RedisCache } = require('apollo-server-cache-redis');
const { typeDefs, resolvers, schemaDirectives } = require('./schema');
const formatError = require('./formatErrors');

const {
  NERApi,
  TikaServer,
  FilesManager,
  KeywordsApi,
  SummarizationApi,
} = require('./dataSources');

const context = async ({ req }) => req;

const dataSources = () => ({
  nerApi: new NERApi(),
  keywordsApi: new KeywordsApi(),
  tikaServer: new TikaServer(),
  files: new FilesManager(),
  summarizationApi: new SummarizationApi(),
});

const server = new ApolloServer({
  tracing: true,
  typeDefs,
  resolvers,
  schemaDirectives,
  formatError,
  dataSources,
  context,
  cache: new RedisCache({
    host: 'localhost',
  }),
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
