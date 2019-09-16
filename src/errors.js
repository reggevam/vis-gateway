const { ApolloError } = require('apollo-server');

const FileNotFoundError = fileId =>
  new ApolloError(`could not find fileId ${fileId}`, 'FILE_NOT_FOUND');

const ClientError = message => new ApolloError(message, 'CLIENT_ERROR');

module.exports = {
  FileNotFoundError,
  ClientError,
};
