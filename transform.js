export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source)

  removeOldFaker(root);
  maybeInsertFaker(root);
  // chainLevelThree(root);

  return root.toSource();



  // function chainLevelThree(root) {
  //   return root
  //     .find(j.Program)
  //     .forEach(path => {
  //       j(path.node.body[0]).insertBefore(standardFakerImport())
  //     })
  //     .toSource({quote: 'single'})
  // }
  //
  function maybeInsertFaker(root) {
    return root
      .find(j.ImportDeclaration)
      .forEach(path => {
        if (isAlreadyImportingSomethingFromFaker(path)) {
          path.insertAfter(standardFakerImport())
        } else {
          path.insertAfter(standardFakerImport())
        }
      })
      .toSource({quote: 'single'});
  }

  function standardFakerImport() {
    return j.importDeclaration(
      [
        j.importSpecifier(j.identifier("faker"))
      ],
      j.literal('faker')
    );
  }

  function removeOldFaker(root) {
    return root
      .find(j.ImportSpecifier)
      .forEach(path => {
        if (isImportingFaker(path) && isImportingFromEmberCliMirage(path)) {
          removeSpecifierOrImportDeclaration(path)
        }
      })
      .toSource({quote: 'single'});
  }

  function isImportingFaker(path) {
    return path.node.imported.name === "faker"
  }

  function isAlreadyImportingSomethingFromFaker(path) {
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
