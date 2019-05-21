const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require('merge-graphql-schemas');
const path = require('path');

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schema/')));

const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers/')),
);
const schemaDirectives = require('./schemaDirectives');

module.exports = {
  typeDefs,
  resolvers,
  schemaDirectives,
};
