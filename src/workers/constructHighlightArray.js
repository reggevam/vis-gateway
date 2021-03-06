const { isMainThread, workerData, parentPort } = require('worker_threads');
const constructHighlightArray = require('./../utils/construct-highlight-array');

if (isMainThread) {
  module.exports = __filename;
} else {
  parentPort.postMessage(
    constructHighlightArray(workerData.content, workerData.entities)
  );
}
