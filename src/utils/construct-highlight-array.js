module.exports = (content, entities) => {
  /**
   * @param {string} content the raw text
   * @param {Array.<{startOffset: number, endOffset: number, ...rest}>} entities
   * @returns {Array.<{text: string, isEntity: boolean, ...rest}>}
   */
  let parsedContent = [];

  // the first fragment of text is always unlabeled it can be empty
  parsedContent = parsedContent.concat({
    isEntity: false,
    text: content.slice(0, entities[0].startOffset),
  });

  // for each item add the entity end the raw text after it
  for (let i = 0; i < entities.length - 1; i++) {
    parsedContent = parsedContent.concat({
      ...entities[i],
      isEntity: true,
      text: content.slice(entities[i].startOffset, entities[i].endOffset),
    });

    parsedContent = parsedContent.concat({
      isEntity: false,
      text: content.slice(entities[i].endOffset, entities[i + 1].startOffset),
    });
  }

  // handle the last item
  parsedContent = parsedContent.concat({
    ...entities[entities.length - 1],
    isEntity: true,
    text: content.slice(
      entities[entities.length - 1].startOffset,
      entities[entities.length - 1].endOffset
    ),
  });

  parsedContent = parsedContent.concat({
    isEntity: false,
    text: content.slice(
      entities[entities.length - 1].endOffset,
      content.length
    ),
  });

  return parsedContent;
};
