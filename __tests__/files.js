const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');
const { constructTestServer } = require('../__testUtils');
require('dotenv').config();

jest.mock('./../src/dataSources/NER.js');
jest.mock('./../src/dataSources/FilesManager.js');
jest.mock('./../src/dataSources/TikaServer.js');

const uploadFileMutation = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
      mimetype
      encoding
      id
      hasEntities
      hasKeywords
      content
    }
  }
`;

const nerQuery = gql`
  query file($fileId: ID!) {
    file(fileId: $fileId) {
      id
      hasEntities
      entities {
        isEntity
        text
      }
    }
  }
`;

const mockFile = new Promise(res =>
  res({
    filename: 'mock file',
    mimetype: 'mock mimetype',
    encoding: 'mock encoding',
  })
);

describe('files', () => {
  test.only('upload a file, expect hasEntities and hasKeywords to be false', async () => {
    const { server } = constructTestServer();
    const { mutate } = createTestClient(server);
    const { data } = await mutate({
      mutation: uploadFileMutation,
      variables: { file: mockFile },
    });
    expect(data).toMatchSnapshot();
  });

  test.skip('ner is returning empty and labeled entities, even entities are labeled and odds are not', async () => {
    const { server } = constructTestServer({
      context: () => ({
        headers: {
          permission: 'not admin',
        },
      }),
    });
    // upload a file
    const { query } = createTestClient(server);
    const { data } = await query({
      query: nerQuery,
      variables: { fileId: 1 },
    });
    const labeledEntities = data.ner.entities.filter((_, ii) => ii % 2);
    const unlabeledEntities = data.ner.entities.filter((_, ii) => ii % 2 === 0);

    labeledEntities.forEach(entity => expect(entity.isEntity).toBeTruthy());
    unlabeledEntities.forEach(entity =>
      expect(entity.isEntity).not.toBeTruthy()
    );
  });
});
