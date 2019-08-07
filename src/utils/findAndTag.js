/* 
this method finds a list of strings in a large text
it extracts the offsets of each element
should come before construct highlight array
*/

module.exports = (content, tags, field) => {
  return tags.reduce((acc, tag, ii) => {
    const startOffset = content.indexOf(field ? tag[field] : tag);
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
