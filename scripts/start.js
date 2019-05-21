const nodemon = require('nodemon');

nodemon({
  script: './bootstrap.js',
  ext: 'js json graphql',
});

nodemon
  .on('start', () => console.info('App has started'))
  .on('restart', files => console.info('App restarted due to: ', files))
  .on('quit', () => {
    console.info('App has quit');
    process.exit();
  });
