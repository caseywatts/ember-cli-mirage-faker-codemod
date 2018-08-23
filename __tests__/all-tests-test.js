jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;
defineTest(__dirname, 'transform', null, 'simple-replace');
defineTest(__dirname, 'transform', null, 'leave-mirage-import-intact');
defineTest(__dirname, 'transform', null, 'insert-into-existing-faker-import');
// defineTest(__dirname, 'transform', null, 'irrelevant-parenthesis-issue');
