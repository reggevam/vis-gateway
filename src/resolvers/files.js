module.exports = {
  File: {
    entities: async ({ id }, settings, { dataSources: { nerApi, files } }) => {
      const file = files.getFile(id);
      const entities = await nerApi.fetchEntities(id, file.content, settings);
      return entities;
    },
    keywords: async (
      { id },
      settings,
      { dataSources: { keywordsApi, files } }
    ) => {
      const file = files.getFile(id);
      const keywords = await keywordsApi.fetchKeywords(
        id,
        file.content,
        settings
      );
      return keywords;
    },
    summary: async (
      { id },
      settings,
      { dataSources: { summarizationApi, files } }
    ) => {
      const file = files.getFile(id);
      const summary = await summarizationApi.fetchSummary(
        id,
        file.content,
        settings
      );
      return summary;
    },
    keyPhrases: async (
      { id },
      settings,
      { dataSources: { KeyPhrasesApi, files } }
    ) => {
      const file = files.getFile(id);
      const keyPhrases = await KeyPhrasesApi.fetchKeyPhrases(
        id,
        file.content,
        settings
      );
      return keyPhrases;
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
