const { ApolloServer } = require('apollo-server');
const { typeDefs, resolvers, schemaDirectives } = require('./schema');
const formatError = require('./formatErrors');
const { RedisCache } = require('apollo-server-cache-redis');
const responseCachePlugin = require('apollo-server-plugin-response-cache');

const {
  NERApi,
  TikaServer,
  KeywordsApi,
  SummarizationApi,
  FileManager,
} = require('./dataSources');

const context = async ({ req }) => req;

const dataSources = () => ({
  nerApi: new NERApi(),
  keywordsApi: new KeywordsApi(),
  tikaServer: new TikaServer(),
  summarizationApi: new SummarizationApi(),
  files: new FileManager(),
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
    connectTimeout: 5000,
    reconnectOnError: err => {
      const targetError = 'READONLY';
      if (err.message.slice(0, targetError.length) === targetError) return true;
    },
    retryStrategy: times => {
      console.info('redis retry', times);
      if (times >= 3) return undefined;
      return Math.min(times * 50, 2000);
    },
    keepAlive: false,
  }),
  plugins: [responseCachePlugin()],
  cacheControl: {
    defaultMaxAge: 1000,
    stripFormattedExtensions: false,
    calculateHttpHeaders: false,
  },
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
