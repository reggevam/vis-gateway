const { isMainThread, workerData, parentPort } = require('worker_threads');
const findAndTag = require('./../utils/findAndTag');

if (isMainThread) {
  module.exports = __filename;
} else {
  parentPort.postMessage(
    findAndTag(workerData.content, workerData.tags, workerData.field)
  );
}
