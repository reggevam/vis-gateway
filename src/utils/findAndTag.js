/* 
this method finds a list of strings in a large text
it extracts the offsets of each element
should come before construct highlight array
*/

module.exports = (content, tags, field) => {
  return tags.reduce((acc, tag, ii) => {
    const startOffset = content.search(
      /* 
      some algorithms tend to lower-case all the keywords,
      names will not be found in a case sensitive search
      */
      new RegExp(field ? tag[field] : tag, 'i')
    );

    if (startOffset === -1) return acc; // a safety fallback for missing keywords
    return field
      ? [
          ...acc,
          {
            ...tag,
            startOffset,
            endOffset: startOffset + tag[field].length,
            tagIdx: ii,
          },
        ]
      : [
          ...acc,
          {
            text: tag,
            startOffset,
            endOffset: startOffset + tag.length,
            tagIdx: ii,
          },
        ];
  }, []);
};
