const { isEqual } = require('lodash');

module.exports = {
  File: {
    entities: async ({ id }, settings, { dataSources: { nerApi, files } }) => {
      const file = files.getFile(id);
      if (file.hasEntities && isEqual(file.entitiesSettings, settings)) {
        return file.entities;
      }
      const entities = await nerApi.fetchEntities(file.content, settings);
      const { entities: fileEntities } = await files.setEntities(
        id,
        file.content,
        entities,
        settings
      );
      return fileEntities;
    },
    keywords: async (
      { id },
      settings,
      { dataSources: { keywordsApi, files } }
    ) => {
      const file = files.getFile(id);
      if (file.hasKeywords && isEqual(file.keywordsSettings, settings))
        return file.keywords;
      const keywords = await keywordsApi.fetchKeywords(file.content, settings);
      const { keywords: fileKeywords } = await files.setKeywords(
        id,
        file.content,
        keywords
      );
      return fileKeywords;
    },
    summary: async (
      { id },
      settings,
      { dataSources: { summarizationApi, files } }
    ) => {
      const file = files.getFile(id);
      if (file.summary && isEqual(file.summarySettings, settings))
        return file.summary;
      const summary = await summarizationApi.fetchSummary(
        file.content,
        settings
      );
      const { summary: fileSummary } = files.setSummary(id, summary, settings);
      return fileSummary;
    },
  },
  Query: {
    allFiles: (_, __, { dataSources: { files } }) => files.getAll(),
    helloTika: (_, __, { dataSources: { tikaServer } }) =>
      tikaServer.sayHello(),
    file: (_, { id }, { dataSources: { files } }) => files.getFile(id),
  },
  Mutation: {
    uploadFile: async (
      _,
      { file: filePromise },
      { dataSources: { tikaServer, files } }
    ) => {
      const file = await filePromise;
      const { filename, mimetype, encoding } = file;
      const content = await tikaServer.parseFile(file);
      return files.create({ content, filename, mimetype, encoding });
    },
  },
};
