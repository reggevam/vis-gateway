const { Worker } = require('worker_threads');
const constructHighlightArray = require('./constructHighlightArray');
const findAndTagWorker = require('./findAndTag');

const setupHighlightArray = (content, entities) =>
  new Promise((res, rej) => {
    const worker = new Worker(constructHighlightArray, {
      workerData: { content, entities },
    });
    worker.on('message', res);
    worker.on('error', rej);
  });

const findAndTag = (content, tags, field) =>
  new Promise((res, rej) => {
    const worker = new Worker(findAndTagWorker, {
      workerData: { content, tags, field },
    });
    worker.on('message', res);
    worker.on('error', rej);
  });

module.exports = { setupHighlightArray, findAndTag };
