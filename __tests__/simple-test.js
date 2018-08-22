jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;
defineTest(__dirname, 'transform', null, 'multiple');
defineTest(__dirname, 'transform', null, 'removal-single');
// defineTest(__dirname, 'transform', null, 'new-faker-import');
// defineTest(__dirname, 'transform', null, 'insert-faker');
