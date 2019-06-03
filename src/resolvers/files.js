module.exports = {
  File: {
    entities: async ({ id }, _, { dataSources: { nerApi, files } }) => {
      const file = files.getFile(id);
      if (file.hasEntities) return file.entities;
      const entities = await nerApi.fetchEntities(file.content);
      const { entities: fileEntities } = await files.setEntities(
        id,
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
