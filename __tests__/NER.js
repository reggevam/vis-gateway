const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');
const { constructTestServer } = require('../__testUtils');
const dummyContent = require('./../fixtures/ner-text');
jest.mock('./../src/dataSources/NER.js');

const nerQuery = gql`
  query ner($content: String!) {
    ner(content: $content) {
      isEntity
      text
    }
  }
`;

describe('NER', () => {
  test('ner is returning empty and labeled entities, even entities are labeled and odds are not', async () => {
    const { server } = constructTestServer({
      context: () => ({
        headers: {
          permission: 'not admin',
        },
      }),
    });

    const { query } = createTestClient(server);

    const { data } = await query({
      query: nerQuery,
      variables: { content: dummyContent },
    });

    const labeledEntities = data.ner.filter((_, ii) => ii % 2);
    const unlabeledEntities = data.ner.filter((_, ii) => ii % 2 === 0);

    labeledEntities.forEach(entity => expect(entity.isEntity).toBeTruthy());
    unlabeledEntities.forEach(entity =>
      expect(entity.isEntity).not.toBeTruthy()
    );
  });
});
