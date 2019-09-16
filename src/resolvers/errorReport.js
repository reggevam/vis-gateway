const { ClientError } = require('./../errors');

module.exports = {
  Mutation: {
    errorReport: (parent, { message }) => {
      throw ClientError(message);
    },
  },
};
