const { createTestClient } = require('apollo-server-testing');
const { gql } = require('apollo-server');
const { constructTestServer } = require('../__testUtils');
require('dotenv').config();

const unknownErrorMutation = gql`
  mutation throwError {
    throwError
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

const errorReportMutation = gql`
  mutation errorReport($message: String!) {
    errorReport(message: $message)
  }
`;

describe('errors', () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error.mockClear();
  });
  afterAll(() => {
    console.error.mockRestore();
  });

  test.each`
    title               | fragment                | type          | variables
    ${'known error'}    | ${fileQuery}            | ${'query'}    | ${{ id: 'nope...' }}
    ${'un-known error'} | ${unknownErrorMutation} | ${'mutation'} | ${{ id: 'nope...' }}
    ${'client error'}   | ${errorReportMutation}  | ${'mutation'} | ${{ message: 'something has gone wrong in the client' }}
  `('$title', async ({ fragment, type, variables }) => {
    const { server } = constructTestServer();
    const testClient = createTestClient(server);
    if (type === 'query') {
      const { query: clientQuery } = testClient;
      await clientQuery({ query: fragment, variables });
    } else {
      const { mutate } = testClient;
      await mutate({ mutation: fragment, variables });
    }
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(console.error.mock.calls[0][0]).toMatchSnapshot();
  });
});
