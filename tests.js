'use strict';

const { runTesty } = require('@pmoo/testy');

runTesty({ directory: require('path').resolve('./tests') });
