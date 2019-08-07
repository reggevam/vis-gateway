/* 
this method finds a list of strings in a large text
it extracts the offsets of each element
should come before construct highlight array
*/
module.exports = (content, tags, field) => {
  return tags.reduce((acc, tag) => {
    const startOffset = content.indexOf(tag[field]);
    return [
      ...acc,
      { ...tag, startOffset, endOffset: startOffset + tag[field].length },
    ];
  }, []);
};
