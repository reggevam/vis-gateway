const { sortBy } = require('lodash');

module.exports = (content, entities) => {
  /**
   * @param {string} content the raw text
   * @param {Array.<{startOffset: number, endOffset: number, ...rest}>} entities
   * @returns {Array.<{text: string, isEntity: boolean, ...rest}>}
   */
  let parsedContent = [];
  const sortedEntities = sortBy(entities, 'startOffset');

  // the first fragment of text is always unlabeled it can be empty
  parsedContent = parsedContent.concat({
    isEntity: false,
    text: content.slice(0, sortedEntities[0].startOffset),
  });

  // for each item add the entity end the raw text after it
  for (let i = 0; i < entities.length - 1; i++) {
    parsedContent = parsedContent.concat({
      ...sortedEntities[i],
      isEntity: true,
      text: content.slice(
        sortedEntities[i].startOffset,
        sortedEntities[i].endOffset
      ),
    });

    parsedContent = parsedContent.concat({
      isEntity: false,
      text: content.slice(
        sortedEntities[i].endOffset,
        sortedEntities[i + 1].startOffset
      ),
    });
  }

  // handle the last item
  parsedContent = parsedContent.concat({
    ...sortedEntities[sortedEntities.length - 1],
    isEntity: true,
    text: content.slice(
      sortedEntities[sortedEntities.length - 1].startOffset,
      sortedEntities[sortedEntities.length - 1].endOffset
    ),
  });

  parsedContent = parsedContent.concat({
    isEntity: false,
    text: content.slice(
      sortedEntities[sortedEntities.length - 1].endOffset,
      content.length
    ),
  });

  return parsedContent;
};
