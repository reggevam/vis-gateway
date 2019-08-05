const NERApi = require('./NER');
const KeywordsApi = require('./keywords');
const TikaServer = require('./TikaServer');
const FilesManager = require('./FilesManager');
const SummarizationApi = require('./Summarization');
const KeyPhrasesApi = require('./KeyPhrases');
const Cache = require('./Cache');

module.exports = {
  NERApi,
  KeywordsApi,
  TikaServer,
  FilesManager,
  SummarizationApi,
  KeyPhrasesApi,
  Cache,
};
