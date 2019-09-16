const { ApolloError } = require('apollo-server');

const stripErrorStackTrace = err => {
  const { extensions, ...rest } = err;
  const { code } = extensions;
  return {
    ...rest,
    extensions: { code },
  };
};

module.exports = err => {
  // the error tracker will track the errors from stdOut
  console.error(stripErrorStackTrace(err));

  if (err.originalError instanceof ApolloError) {
    return stripErrorStackTrace(err);
  }
  return new ApolloError('UNKNOWN_ERROR', 'UNKNOWN_ERROR');
};
