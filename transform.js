export default function transformer (file, api) {
  // setup
  const j = api.jscodeshift
  const root = j(file.source)

  // "main"
  if (hasAnyFakerImports(root)) { // if faker isn't used in this file, skip it
    if (importsAnythingFromFakerAlready(root)) {
      insertIntoFaker(root)
    } else {
      insertFakerAfterMirage(root)
    }
    removeFakerFromMirage(root)
  }

  return root.toSource({quote: 'single'})

  // global checks
  function importsAnythingFromFakerAlready (root) {
    return root
      .find(j.ImportDeclaration)
      .some(isImportingFromFaker)
  }

  function hasAnyFakerImports (root) {
    return root
      .find(j.ImportSpecifier)
      .some(isImportingFaker)
  }

  // manipulations
  function insertIntoFaker (root) {
    root
      .find(j.ImportDeclaration)
      .filter(isImportingFromFaker)
      .forEach(insertFakerSpecifier)
  }

  function insertFakerAfterMirage (root) {
    root
      .find(j.ImportDeclaration)
      .filter(path => {
        return path.node.source.value === 'ember-cli-mirage'
      })
      .insertAfter(standardFakerImport())
  }

  function removeFakerFromMirage (root) {
    root
      .find(j.ImportSpecifier)
      .forEach(path => {
        if (isImportingFaker(path) && isImportingFromEmberCliMirage(path.parent)) {
          removeSpecifierOrImportDeclaration(path)
        }
      })
  }

  function insertFakerSpecifier (path) {
    insertSpecifier(path, fakerSpecifier())
  }

  // node generation
  function standardFakerImport () {
    return j.importDeclaration(
      [
        fakerSpecifier()
      ],
      j.literal('faker')
    )
  }

  function fakerSpecifier () {
    return j.importSpecifier(j.identifier('faker'))
  }

  // node checks - importSpecifierPath
  function isImportingFaker (importSpecifierPath) {
    return importSpecifierPath.node.imported.name === 'faker'
  }

  function isImportingFromEmberCliMirage (importSpecifierPath) {
    return importSpecifierPath.node.source.value === 'ember-cli-mirage'
  }

  function isImportingFromFaker (importSpecifierPath) {
    return importSpecifierPath.node.source.value === 'faker'
  }

  // node checks - importDeclarationPath
  function isOnlySpecifierInImportDeclaration (importDeclarationPath) {
    return importDeclarationPath.node.specifiers.length === 1
  }

  // general utility
  function removeSpecifierOrImportDeclaration (importSpecifierPath) {
    const importDeclarationPath = importSpecifierPath.parent
    if (isOnlySpecifierInImportDeclaration(importDeclarationPath)) {
      j(importDeclarationPath).remove() // remove entire import declaration
    } else {
      j(importSpecifierPath).remove() // remove just the one specifier
    }
  }

  function insertSpecifier (importDeclarationPath, specifier) {
    importDeclarationPath.get('specifiers').push(specifier)
  }
}
