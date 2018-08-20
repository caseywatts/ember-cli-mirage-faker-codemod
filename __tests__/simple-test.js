jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;
defineTest(__dirname, 'transform', null, 'removal-multiple');
defineTest(__dirname, 'transform', null, 'removal-single');
