export default function transformer(file, api) {
  const j = api.jscodeshift;
  return maybeInsertFaker(removeOldFaker(file.source));

  function maybeInsertFaker(source) {
    return j(source)
      .find(j.ImportDeclaration)
      .forEach(path => {
        if (isImportingFromFaker(path)) {
          //add faker to specifiers in path.node.specifiers if not already present
        }
      })
      .toSource();
  }

  function removeOldFaker(source) {
    return j(source)
      .find(j.ImportSpecifier)
      .forEach(path => {
        if (isImportingFaker(path) && isImportingFromEmberCliMirage(path)) {
          removeSpecifierOrImportDeclaration(path)
        }
      })
      .toSource();
  }

  function isImportingFaker(path) {
    return path.node.imported.name === "faker"
  }

  function isImportingFromFaker(path) {
    return path.node.source.value === "faker"
  }

  function isImportingFromEmberCliMirage(path) {
    return path.parent.node.source.value === "ember-cli-mirage"
  }

  function isOnlySpecifierInImportDeclaration(path) {
    return path.parent.node.specifiers.length === 1
  }

  function removeSpecifierOrImportDeclaration(path) {
    if (isOnlySpecifierInImportDeclaration(path)) {
      j(path.parent).remove(); // remove entire import declaration
    } else {
      j(path).remove(); // remove just the one specifier
    }
  }
}
