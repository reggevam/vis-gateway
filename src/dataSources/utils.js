const { findAndTag, setupHighlightArray } = require('./../workers');

const structureArrayFromContent = async (content, tags, prop) => {
  const offsetArray = await findAndTag(content, tags, prop);
  return setupHighlightArray(content, offsetArray);
};

module.exports = {
  structureArrayFromContent,
};
