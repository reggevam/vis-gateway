const uuid = jest.genMockFromModule('uuid');

uuid.v4 = () => 1;
module.exports = uuid;
