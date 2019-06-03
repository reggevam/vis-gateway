module.exports = {
  File: {
    entities: async ({ id: fileId }, _, { dataSources: { nerApi, files } }) => {
      const file = files.getFile(fileId);
      if (file.hasEntities) return file;
      const entities = await nerApi.fetchEntities(file.content);
      return files.setEntities(fileId, file.content, entities);
    },
  },
  Query: {
    allFiles: (_, __, { dataSources: { files } }) => files.getAll(),
    helloTika: (_, __, { dataSources: { tikaServer } }) => {
      return tikaServer.sayHello();
    },
    file: (_, { fileId }, { dataSources: { files } }) => files.getFile(fileId),
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
