let files = {};

module.exports = {
  Query: {
    files: () => Object.values(files),
  },
  Mutation: {
    singleUpload: async (_, { file }) => {
      // const f = await file();
      // console.log({ file });
      const f = await file;
      console.log(f);
      // return { ...f };
      return f;
    },
  },
};
