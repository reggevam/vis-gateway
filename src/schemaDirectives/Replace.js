const { SchemaDirectiveVisitor } = require('apollo-server');

class ReplaceDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { replacement } = this.args;
    field.resolve = () => replacement;
  }
}

module.exports = ReplaceDirective;
