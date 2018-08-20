// Press ctrl+space for code completion
function isImportingFaker(path) {
  if(path.node.imported.name === "faker") {
    return true
  }
}

function isImportingFromEmberCliMirage(path) {
  if(path.parent.node.source.value === "ember-cli-mirage") {
    return true
  }
}

export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.ImportSpecifier)
    .forEach(path => {
      if (isImportingFaker(path) && isImportingFromEmberCliMirage(path)) {
        console.log('case we are looking for')
        j(path).remove();
      }
    })
    .toSource();
}


// defineInlineTest(transform, {}, "import { faker } from 'ember-cli-mirage';", 'expected output', 'test name (optional)');
