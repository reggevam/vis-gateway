module.exports = {
  File: {
    entities: async ({ id: fileId }, _, { dataSources: { nerApi, files } }) => {
      const file = files.getFile(fileId);
      if (file.hasEntities) return file.entities;
      const entities = await nerApi.fetchEntities(file.content);
      const { entities: fileEntities } = await files.setEntities(
        fileId,
        file.content,
        entities
      );
      return fileEntities;
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
