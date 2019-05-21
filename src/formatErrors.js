const { ApolloError } = require('apollo-server');

const stripErrorStackTrace = err => {
  const { extensions, ...rest } = err;
  const { code } = extensions;
  return {
    ...rest,
    extensions: {
      code,
    },
  };
};

module.exports = err => {
  // the error tracker will track the errors from stdOut
  console.error(err);
  return err.originalError instanceof ApolloError
    ? stripErrorStackTrace(err)
    : new ApolloError('UNKNOWN_ERROR', 'UNKNOWN_ERROR');
};
