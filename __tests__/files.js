const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');
const { constructTestServer } = require('../__testUtils');
require('dotenv').config();

jest.mock('./../src/dataSources/NER.js');
jest.mock('./../src/dataSources/TikaServer.js');
jest.mock('./../src/dataSources/Summarization.js');
jest.mock('./../src/dataSources/FilesManager.js');

const uploadFileMutation = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
      mimetype
      encoding
      id
      content
    }
  }
`;

const nerQuery = gql`
  query file($id: ID!) {
    file(id: $id) {
      id
      entities {
        isEntity
        text
      }
    }
  }
`;

const fileQuery = gql`
  query file($id: ID!) {
    file(id: $id) {
      filename
      mimetype
      encoding
      id
      content
    }
  }
`;

const summaryQuery = gql`
  query file($id: ID!, $ratio: Float) {
    file(id: $id) {
      filename
      mimetype
      encoding
      id
      content
      summary(ratio: $ratio) {
        tagIdx
        text
        isEntity
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

const uploadFile = testClient => {
  const { mutate } = testClient;
  return mutate({
    mutation: uploadFileMutation,
    variables: { file: mockFile },
  });
};

describe('files', () => {
  test('fetch file byId', async () => {
    const { server } = constructTestServer();
    const testClient = createTestClient(server);
    const { data: uploadData } = await uploadFile(testClient);
    const { id } = uploadData.uploadFile;
    const { query } = testClient;
    const { data: fileData } = await query({
      query: fileQuery,
      variables: { id },
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
      variables: { id: 1 },
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

  test('summarization is returning a highligh array with tagIds', async () => {
    const { server } = constructTestServer();
    const testClient = createTestClient(server);
    await uploadFile(testClient);
    const { query } = testClient;
    const { data } = await query({
      query: summaryQuery,
      variables: { id: 1, ratio: 0.5 },
    });
    expect(data).toMatchSnapshot();
  });
});
