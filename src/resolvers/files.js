module.exports = {
  Query: {
    allFiles: (_, __, { dataSources: { files } }) => files.getAll(),
    helloTika: (_, __, { dataSources: { tikaServer } }) => {
      return tikaServer.sayHello();
    },
    ner: async (_, { fileId }, { dataSources: { nerApi, files } }) => {
      const file = files.getFile(fileId);
      if (file.hasEntities) return file;
      const entities = await nerApi.fetchEntities(file.content);
      return files.setEntities(fileId, file.content, entities);
    },
  },
  Mutation: {
    singleUpload: async (
      _,
      { file: filePromise },
      { dataSources: { tikaServer, files } }
    ) => {
      const file = await filePromise;
      const { filename, mimetype, encoding } = file;
      const content = await tikaServer.parseFile(file);
      const fileId = files.create({ content, filename, mimetype, encoding });
      return { filename, mimetype, encoding, id: fileId };
    },
  },
};
