// Press ctrl+space for code completion

export default function transformer(file, api) {
  const j = api.jscodeshift;

  return maybeInsertFaker(removeOldFaker(file.source));

  function maybeInsertFaker(source) {
    return j(source)
      .find(j.ImportSpecifier)
      .forEach(path => {
        console.log(path)
      })
      .toSource();
  }

  function removeOldFaker(source) {
    return j(source)
      .find(j.ImportSpecifier)
      .forEach(path => {
        if (isImportingFaker(path) && isImportingFromEmberCliMirage(path)) {
          removeSpecifierOrImportDeclaration(path)


          // next: add in the correct import
        }
      })
      .toSource();
  }

  function isImportingFaker(path) {
    return path.node.imported.name === "faker"
  }

  function isImportingFromEmberCliMirage(path) {
    return path.parent.node.source.value === "ember-cli-mirage"
  }

  function isOnlySpecifierInImportDeclaration(path) {
    return path.parent.node.specifiers.length === 1
  }

  function removeSpecifierOrImportDeclaration(path) {
    if (isOnlySpecifierInImportDeclaration(path)) {
      j(path.parent.parent).remove(); // remove entire import declaration
    } else {
      j(path).remove(); // remove just the one specifier
    }
  }
}


// defineInlineTest(transform, {}, "import { faker } from 'ember-cli-mirage';", 'expected output', 'test name (optional)');
