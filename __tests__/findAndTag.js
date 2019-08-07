const findAndTag = require('./../src/utils/findAndTag');
const {
  setupHighlightArray,
  findAndTag: findAndTagWorker,
} = require('./../src/workers/index');

describe('findAndTag', () => {
  const content = 'the big brown fox jumped over the fence';
  const tags = [
    { text: 'the', confidence: 0.1 },
    { text: 'big', confidence: 0.2 },
    { text: 'over', confidence: 0.3 },
    { text: 'fence', confidence: 0.4 },
  ];
  it('should construct and offsets array', () => {
    expect(findAndTag(content, tags, 'text')).toMatchSnapshot();
  });

  it('should run async as a worker', async () => {
    expect(await findAndTagWorker(content, tags, 'text')).toMatchSnapshot();
  });

  it('should construct a highlight array from the offset array', async () => {
    const offsetArray = findAndTag(content, tags, 'text');
    const highlightArray = await setupHighlightArray(content, offsetArray);
    expect(highlightArray).toMatchSnapshot();
  });
});
