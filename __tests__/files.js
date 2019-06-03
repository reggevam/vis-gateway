const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');
const { constructTestServer } = require('../__testUtils');
require('dotenv').config();

jest.mock('./../src/dataSources/NER.js');
jest.mock('./../src/dataSources/FilesManager.js');
jest.mock('./../src/dataSources/TikaServer.js');
jest.mock('./../src/dataSources/cachedState.js');
const SET_EMPTY_CACHE = true;

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
      tags {
        isEntity
      }
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

const fileQuery = gql`
  query file($fileId: ID!) {
    file(fileId: $fileId) {
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

const mockFile = new Promise(res =>
  res({
    filename: 'mock file',
    mimetype: 'mock mimetype',
    encoding: 'mock encoding',
  })
);

const uploadFile = testClient => {
  const { mutate } = testClient;
  return mutate({
    mutation: uploadFileMutation,
    variables: { file: mockFile },
  });
};

describe('files', () => {
  test('upload a file, expect hasEntities and hasKeywords to be false', async () => {
    process.env.INITIAL_FILE_CACHE = 'EMPTY';
    const { server } = constructTestServer();
    const testClient = createTestClient(server);
    const { data } = await uploadFile(testClient);
    expect(data).toMatchSnapshot();
    process.env.INITIAL_FILE_CACHE = 'MOCK';
  });

  test('fetch file byId', async () => {
    const { server } = constructTestServer();
    const testClient = createTestClient(server);
    const { data: uploadData } = await uploadFile(testClient);
    const fileId = uploadData.uploadFile.id;
    const { query } = testClient;
    const { data: fileData } = await query({
      query: fileQuery,
      variables: { fileId },
    });
    expect(fileData).toMatchSnapshot();
  });

  test('ner is returning empty and labeled entities, even entities are labeled and odds are not', async () => {
    const { server } = constructTestServer();
    const testClient = createTestClient(server);
    await uploadFile(testClient);
    const { query } = testClient;
    const { data } = await query({
      query: nerQuery,
      variables: { fileId: 1 },
    });

    const labeledEntities = data.file.entities.filter((_, ii) => ii % 2);
    const unlabeledEntities = data.file.entities.filter(
      (_, ii) => ii % 2 === 0
    );

    labeledEntities.forEach(entity => expect(entity.isEntity).toBeTruthy());
    unlabeledEntities.forEach(entity =>
      expect(entity.isEntity).not.toBeTruthy()
    );
  });
});
