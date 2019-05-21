const {
  SchemaDirectiveVisitor,
  AuthenticationError,
} = require('apollo-server');
const { defaultFieldResolver } = require('graphql');

class PermissionDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    field.resolve = async (...args) => {
      const { resolver = defaultFieldResolver } = field;
      const context = args[2];
      const { permission } = context.headers;
      if (!permission || permission !== this.args.role) {
        throw new AuthenticationError(
          `The field {${field.name}} is available only for ${
            this.args.role
          } role`
        );
      }
      return resolver.apply(this, args);
    };
  }
}

module.exports = PermissionDirective;
