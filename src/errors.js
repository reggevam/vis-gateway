const { ApolloError } = require('apollo-server');

const FileNotFoundError = fileId =>
  new ApolloError(`could not find fileId ${fileId}`, 'FileNotFound');

module.exports = {
  FileNotFoundError,
};
