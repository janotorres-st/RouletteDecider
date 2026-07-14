const Jasmine = require('jasmine');
const jasmine = new Jasmine();

console.log('\x1b[36m%s\x1b[0m', 'Pruebas Unitarias lanzadas.');

jasmine.loadConfig({
    spec_dir: '.',
    spec_files: ['test-de-login.js'],
    random: false
});

global.localStorage = {
    store: {},
    setItem(key, value) { this.store[key] = value; },
    getItem(key) { return this.store[key] || null; },
    removeItem(key) { delete this.store[key]; }
};

jasmine.execute();