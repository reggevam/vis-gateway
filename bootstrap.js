const { server } = require('./src');

server.listen().then(({ url }) => {
  console.info(`🚀 listening on ${url}`);
});
