const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers, schemaDirectives } = require('./schema');
const formatError = require('./formatErrors');

const {
  NERApi,
  TikaServer,
  FilesManager,
  KeywordsApi,
  SummarizationApi,
  KeyPhrasesApi,
  Cache,
} = require('./dataSources');
const context = async ({ req }) => req;

const dataSources = () => ({
  nerApi: new NERApi(),
  keywordsApi: new KeywordsApi(),
  tikaServer: new TikaServer(),
  summarizationApi: new SummarizationApi(),
  KeyPhrasesApi: new KeyPhrasesApi(),
  files: new FilesManager(),
  cache: new Cache(),
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
