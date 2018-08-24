export default function transformer (file, api) {
  // setup
  const j = api.jscodeshift
  const root = j(file.source)

  // "main"
  if (hasAnyFakerImports(root)) { // if faker isn't used in this file, skip it
    if (importsAnythingFromFakerAlready(root)) {
      findAndInsertFaker(root)
    } else {
      insertFakerAfterMirage(root)
    }
    removeOldFaker(root)
  }

  return root.toSource({quote: 'single'})

  // global checks
  function importsAnythingFromFakerAlready (root) {
    return root
      .find(j.ImportDeclaration)
      .some(path => {
        return isImportingFromFaker(path)
      })
  }

  function hasAnyFakerImports (root) {
    return root
      .find(j.ImportSpecifier)
      .some(path => {
        return isImportingFaker(path)
      })
  }

  // manipulations
  function findAndInsertFaker (root) {
    root
      .find(j.ImportDeclaration)
      .filter(path => {
        return isImportingFromFaker(path)
      })
      .forEach(path => {
        insertSpecifier(path)
      })
  }

  function insertFakerAfterMirage (root) {
    root
      .find(j.ImportDeclaration)
      .filter(path => {
        return path.node.source.value === 'ember-cli-mirage'
      })
      .insertAfter(standardFakerImport())
  }

  function removeOldFaker (root) {
    root
      .find(j.ImportSpecifier)
      .forEach(path => {
        if (isImportingFaker(path) && isImportingFromEmberCliMirage(path.parent)) {
          removeSpecifierOrImportDeclaration(path)
        }
      })
  }

  // node generation
  function standardFakerImport () {
    return j.importDeclaration(
      [
        j.importSpecifier(j.identifier('faker'))
      ],
      j.literal('faker')
    )
  }

  // node checks
  function isImportingFaker (path) {
    return path.node.imported.name === 'faker'
  }

  function isImportingFromEmberCliMirage (path) {
    return path.node.source.value === 'ember-cli-mirage'
  }

  function isImportingFromFaker (path) {
    return path.node.source.value === 'faker'
  }

  function isOnlySpecifierInImportDeclaration (path) {
    return path.node.specifiers.length === 1
  }

  // general utility
  function removeSpecifierOrImportDeclaration (path) {
    if (isOnlySpecifierInImportDeclaration(path.parent)) {
      j(path.parent).remove() // remove entire import declaration
    } else {
      j(path).remove() // remove just the one specifier
    }
  }

  function insertSpecifier (path) {
    path.get('specifiers').push(
      j.importSpecifier(j.identifier('faker'))
    )
  }
}
