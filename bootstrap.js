require('dotenv').config();

const { server } = require('./src');

console.log(process.env.NER_URL);

server.listen().then(({ url }) => {
  console.info(`🚀 listening on ${url}`);
});
