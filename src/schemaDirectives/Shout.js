const { SchemaDirectiveVisitor } = require('apollo-server');
const { defaultFieldResolver } = require('graphql');

class ShoutDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    field.resolve = (...args) => {
      const { resolver = defaultFieldResolver } = field;
      const result = resolver.apply(this, args);
      if (result.toUpperCase) return `${result.toUpperCase()}!`;
      return result;
    };
  }
}

module.exports = ShoutDirective;
