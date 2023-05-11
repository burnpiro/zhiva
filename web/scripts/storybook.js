const execSync = require('child_process').execSync;

const config = require('../package.json').config;

const type = process.argv[2] || 'run'

const arg = process.argv[3] || config.defaultStorybookComponent;

console.log (`nx run ${arg}:${type === 'build' ? 'build-' : ''}storybook`)
if(type === 'run') {
  execSync(`nx run ${arg}:storybook`);
} else if (type === 'build') {
  execSync(`nx run ${arg}:build-storybook`);
}
