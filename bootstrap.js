const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './.env.production' });
  console.info('running in production');
} else {
  dotenv.config();
  console.info('running in development');
}

const { server } = require('./src');

server.listen().then(({ url }) => {
  console.info(`🚀 listening on ${url}`);
});
