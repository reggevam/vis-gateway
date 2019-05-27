const { Worker } = require('worker_threads');
const constructHighlightArray = require('./constructHighlightArray');

const setupHighlightArray = (content, entities) =>
  new Promise((res, rej) => {
    const worker = new Worker(constructHighlightArray, {
      workerData: { content, entities },
    });
    worker.on('message', res);
    worker.on('error', rej);
  });

module.exports = { setupHighlightArray };
